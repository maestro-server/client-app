'use strict'

import Teams from 'factories/teams'
import FectherEntity from 'services/fetchEntity'
import store from 'src/store'


export default {
  data: function () {
    return {
      menu: {
        teams: ['Teams', 'fa-users'],
        projects: ['Projects', 'fa-sticky-note-o'],
        providers: ['Providers', 'fa-wrench'],
        hr: true,
        access_manager: ['Access Manager', 'fa-key'],
        profile: ['Profile', 'fa-user'],
        logout: ['Logout', 'fa-sign-out']
      },
      showDrop: {tenants: false, settings: false},
      teams: [],
      tenant: {name: null, _id: null},
      avatar: IMG_AVATAR_DEFAULT
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
      FectherEntity(Teams)(this)({k: 'teams'})
        .find((e) => {
          this.$set(this, 'teams', e.data)
        })
    },

    img_default(item) {
      if(_.has(item, 'avatar')) {
        return STATIC_URL + item.avatar
      }

      return IMG_AVATAR_DEFAULT
    },

    changeTenant(team, refs='teams') {
      const tn = _.assign({}, team, {refs})

      this.updateViewTenant(tn)
      store.dispatch('setTenant', tn)
    },

    updateViewTenant(tn) {
      this.avatar = this.img_default(tn)

      const obj = _.assign({}, this.tenant, tn)
      this.$set(this, 'tenant', obj)
      
      this.toggle('all')
    }
  },

  computed: {
    storageUser() {
      return this.$store.getters.get_me
    },
    users() {
      return this.storageUser
    },
    storageTeam() {
      return this.$store.getters.get_tenant
    }
  },

  created() {
    this.fetchData()

    const tn = this.storageTeam || this.storageUser
    this.updateViewTenant(tn)
  }
}
