'use strict'

import Modals from 'mixins/modals'
import Clients from 'factories/clients'

export default {
  mixins: [Modals],

  data() {
    return {
      tmp: {created: [], deleted: []},
      URL: `${API_URL}/system?query=`,
      value: [],
      mirrorValue: [],
      template_system: "<b>{{item.name}}</b>"
    }
  },

  methods: {
    setTabShow(index) {
      this.tabShow = index
      return this
    },

    afterShow() {
      this.text.title = this.create ? 'Create new Client' : `Add news system into ${this.model.name}`

      if (!this.create) {
        this.editLoad()
      }
    },

    editLoad() {
      const list_system = _.get(this, 'model.list_system', [])

      this.$set(this, 'value', list_system)
      this.mirrorValue = _.clone(list_system)
    },

    setupModel() {
      const oldv = this.mirrorValue.map(e => e._id)
      const newv = this.value.map(e => e._id)

      this.tmp.created = _.difference(newv, oldv)
      this.tmp.deleted = _.difference(oldv, newv)
    },

    editSave() {
      this.setupModel()
      this.createdClientSys(this.tmp.created)
      this.deletedClientSys(this.tmp.deleted)
    },

    createdClientSys(id) {
      if (!_.isEmpty(id)) {

        const _id =  `${this.model._id}/system`
        FectherEntity(Clients)(this)({k: 'system_app_'+this.model._id})
          .update(this.finishJob, {id}, _id)
      }
    },

    deletedClientSys(id) {
      if (!_.isEmpty(id)) {

        const _id =  `${this.model._id}/system`
        FectherEntity(Clients)(this)({k: 'system_app_'+this.model._id})
          .remove(this.finishJob, {id}, _id)
      }
    },

    setTeam(item) {
      this.$set(this.model, 'team', item)
      return this
    },

    teamSelected(item) {
      this.setTeam(item)
      this.model.input = ""
    },

    requestSearch(async, val, key = 'name') {
      return `${async}%7B"${key}":"${val}"`
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
