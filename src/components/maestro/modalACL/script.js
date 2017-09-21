'use strict'

import Modals from 'mixins/modals'
import Users from 'factories/users'

import FectherEntity from 'services/fetchEntity'

export default {
  mixins: [Modals],

  props: {
    entity: {},
    fielder: {default: "roles", type: String}
  },

  data() {
    return {
      label: 'Member',
      value: [],
      defaultRole: 1,
      usersEntity: Users,
      template: "{{item.name}} - <small>{{item.email}}</small>"
    }
  },

  computed: {
    URL() {
      return `${new this.usersEntity().getUrl()}?autocomplete?complete=`
    }
  },

  methods: {
    afterShow() {
      this.text.title = `Manange access to ${this.model.name}`
    },

    onHit(item) {
      const exist = _.find(this.value, ['_id', item._id])

      if (!exist) {
        const nItem = _.assign({}, item, {role: this.defaultRole})
        this.value.push(nItem)
      }
    },

    editLoad () {
      this.value = _.get(this.model, 'roles', [])
    },

    setupModel () {
      _.merge(this.model[this.fielder], this.value)
    },

    editSave() {
      this.setupModel()
      FectherEntity(this.entity)()
        .update(this.finishJob, this.model[this.fielder], this.model._id+'/roles')
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
