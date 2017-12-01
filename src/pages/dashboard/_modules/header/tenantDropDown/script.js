'use strict'

import _ from 'lodash'
import Teams from 'factories/teams'
import FectherEntity from 'services/fetchEntity'

import Me from 'factories/me'
import store from 'src/store'
import tenantMananger from 'services/tenantManager'

export default {
  data: function () {
    return {
      menu: {
        teams: ['Teams', 'fa-users'],
        providers: ['Providers', 'fa-wrench'],
        events: ['Events', 'fa-bell'],
        hr: true,
        access_manager: ['Access Manager', 'fa-key'],
        profile: ['Profile', 'fa-user'],
        logout: ['Logout', 'fa-sign-out']
      },
      showDrop: {tenants: false, settings: false},
      teams: {},
      tenant: {name: null, _id: null},
      avatar: IMG_AVATAR_DEFAULT,
      users: {}
    }
  },

  methods: {
    toggle(key) {
      let on = false;

      _.forEach(this.showDrop, (v, k) => {
        if (key === k) {
          on = !v
        }
        this.showDrop[k] = (key === k) ? !v : false
      })

      this.eventClickOutside(on)
    },

    eventClickOutside(val) {
      return val
        ? document.addEventListener('click', this.clickOutside, false)
        : document.removeEventListener('click', this.clickOutside, false)
    },

    clickOutside(e) {
      if (!this.$el.contains(e.target)) {
        this.toggle('all')
      }
    },

    fetchData: function () {
      FectherEntity(Teams)({k: 'teams', force: true})
        .find((e) => {
          this.$set(this, 'teams', e.data)
        })
    },

    img_default(item) {
      if(_.has(item, 'avatar')) {
        return _.get(store.getters, 'get_options.static_url') + item.avatar
      }

      return IMG_AVATAR_DEFAULT
    },

    changeTenant(team, refs='teams') {
      const tn = _.assign({}, team, {refs})

      tenantMananger.set(tn)
      this.updateViewTenant(tn)
      this.$router.go()
    },

    updateViewTenant(tn) {
      this.avatar = this.img_default(tn)

      const obj = _.assign({}, this.tenant, tn)
      this.$set(this, 'tenant', obj)

      this.toggle('all')
    },

    updateUser() {
      const me = this.$store.getters.get_me

      if(_.isEmpty(me)) {
        FectherEntity(Me)({persistence: 'local'})
          .find(this.fallbackUser)
      }

      this.$set(this, 'users', me)
    },

    fallbackUser(e) {
      store.dispatch('setUser',  e.data)
      this.$set(this, 'users', e.data)

      this.changeTenant(e.data, 'users')
    }
  },

  computed: {
    storageTeam() {
      return tenantMananger.get()
    },
    hasTeams() {
      const total = _.get(this.teams, 'items', [])
      return total.length
    }
  },

  created() {
    this.fetchData()
    this.updateUser()

    const tn = this.storageTeam || this.users
    this.updateViewTenant(tn)
  }
}
