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

    onHit(item, role = 1) {
      const exist = _.find(this.value, ['_id', item._id])

      if (!exist) {
        _.merge(item, {role})
        this.value.push(item)
      }
    },

    setupModel () {
      _.merge(this.model[this.fielder], this.value)
    },

    editSave() {
      this.setupModel()
      console.log(this.model[this.fielder])
      //FectherEntity(this.entity)()
      //  .update(this.finishJob, this.model)
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
