'use strict'

import Modals from 'mixins/modals'
import Users from 'factories/users'
import Teams from 'factories/teams'
import headerLogin from 'src/resources/libs/headerAuthorization'

import FectherEntity from 'services/fetchEntity'

export default {
  mixins: [Modals],

  props: {
    entity: {},
    fielder: {default: "roles", type: String},
    showUser: {default: true, type: Boolean},
    showTeam: {default: true, type: Boolean}
  },

  data() {
    return {
      headers: headerLogin,
      label: 'Member',
      value: [],
      defaultRole: 1,
      defaultRefs: 'users',
      usersEntity: Users,
      template: "{{item.name}} - <small>{{item.email}}</small>"
    }
  },

  computed: {
    URL() {
      return `${new Users().getUrl()}/autocomplete?complete=`
    },
    URL_TEAM() {
      return `${new Teams().getUrl()}/autocomplete?complete=`
    }
  },

  methods: {
    afterShow() {
      this.text.title = `Manange access to ${this.model.name}`
    },

    onHitUser(item) {
      this.onHit(item)
    },

    onHitTeams(item) {
      this.onHit(item, 'teams')
    },

    onHit(item, refs = 'users', role = 1) {
      const exist = _.find(this.value, ['_id', item._id])

      if (!exist) {
        const nItem = _.assign({}, item, {role, refs})
        this.value.push(nItem)
      }
    },

    editLoad () {
      this.value = _.get(this.model, this.fielder, [])
    },

    setupModel () {
      _.merge(this.model[this.fielder], this.value)
    },

    editSave() {
      this.setupModel()

      const cleanArr = this.model[this.fielder].map(e=>_.pick(e, ['_id', 'email', 'name', 'refs', 'role']))
      FectherEntity(this.entity)()
        .update(this.finishJob, cleanArr, this.model._id+'/'+this.fielder)
    },

    updateRolers(item, role) {
      const data = this.value.map((e) => {
        if (e._id == item._id) {
          _.merge(e, {role})
        }
        return e
      })

      this.$set(this, 'value', data)
    }

  }
}
