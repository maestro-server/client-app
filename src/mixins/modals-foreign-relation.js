'use strict'
import _ from 'lodash'
import FectherEntity from 'services/fetchEntity'

export default {
  data() {
    return {
      tmp: {created: [], deleted: []},
      value: [],
      mirrorValue: [],
      template: "<b>{{item.name}}</b>",
    }
  },

  computed: {
    URL() {
      return `${API_URL}${this.relation}?query=`
    }
  },

  methods: {
    afterShow() {
      this.text.title = `Add news ${this.relation} into ${this.model.name}`
    },

    editLoad() {
      const list = _.get(this, `model.${this.fielder}`, [])

      this.$set(this, 'value', list)
      this.mirrorValue = _.clone(list)
    },

    setupModel() {
      const oldv = this.mirrorValue.map(e => e._id)
      const newv = this.value.map(e => e._id)

      this.tmp.created = _.difference(newv, oldv)
      this.tmp.deleted = _.difference(oldv, newv)
    },

    editSave() {
      this.setupModel()
      this.createdItems(this.tmp.created)
      this.deletedItems(this.tmp.deleted)
    },

    createdItems(id) {
      if (!_.isEmpty(id)) {

        const _id =  `${this.model._id}/${this.relation}`
        FectherEntity(this.entity)({force: true})
          .update(this.finishJob, {id}, _id)
      }
    },

    deletedItems(id) {
      if (!_.isEmpty(id)) {
        const _id =  `${this.model._id}/${this.relation}`
        FectherEntity(this.entity)()
          .remove(this.finishJob, {id}, _id)
      }
    },

    requestSearch(async, val, key='name') {
      return `${async}%7B"${key}":"${val}"%7D`
    },

    onHit(item) {
      const exist = _.find(this.value, ['_id', item._id])

      if (!exist) {
        this.value.push(item)
      }
    },

    deleteApp(key) {
      this.value.splice(key, 1)
    }
  }
}
