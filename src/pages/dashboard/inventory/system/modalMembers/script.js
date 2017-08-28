'use strict'

import Modals from 'mixins/modals'
import System from 'factories/system'
import Adminer from 'factories/adminer'
import formatAdminer from 'src/resources/libs/formatAdminerData'
import FectherEntity from 'services/fetchEntity'

export default {
  mixins: [Modals],

  data() {
    return {
      tmp: {created: [], deleted: []},
      options: {
        check: [],
        apps: []
      },
      URL: `${API_URL}/applications?query=`,
      type: "Application",
      value: [],
      mirrorValue: [],
      template_apps: "<b>{{item.name}}</b> <span v-if='item.environment'>({{item.environment}})</span> <h5 class='ft15 inline'><bs-label type='default' v-if='item.spec'>{{item.spec.role}}</bs-label></h5>"
    }
  },

  methods: {
    setTabShow(index) {
      this.tabShow = index
      return this
    },

    afterShow() {
      this.text.title = this.create ? 'Create new System' : `Add news app into ${this.model.name} system`

      if (!this.create) {
        this.editLoad()
      }
    },

    editLoad() {
      const {list_apps} = this.model
      this.$set(this, 'value', list_apps)

      this.mirrorValue = _.clone(list_apps)
    },

    setupModel() {
      const oldv = this.mirrorValue.map(e => e._id)
      const newv = this.value.map(e => e._id)

      this.tmp.created = _.difference(newv, oldv)
      this.tmp.deleted = _.difference(oldv, newv)
    },

    editSave() {
      this.setupModel()
      this.createdSystemApp(this.tmp.created)
      this.deletedSystemApp(this.tmp.deleted)
    },

    createdSystemApp(id) {
      if (!_.isEmpty(id)) {
        new System({id})
          .authorization()
          .patchID(
            `${this.model._id}/applications`,
            this.finishJob
          )
      }
    },

    deletedSystemApp(id) {
      if (!_.isEmpty(id)) {
        new System({id})
          .authorization()
          .deleteID(
            `${this.model._id}/applications`,
            this.finishJob
          )
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

    fetchData() {
      FectherEntity(Adminer)(this)({k: 'system_options', persistence: 'local', time: 2840})
        .find(this.fetchAdminer, {key: 'system_options'})
    },


    fetchAdminer(e) {
      _.assign(this.options, formatAdminer(e))
    },

    requestSearch(async, val, key = 'name') {
      return `${async}%7B"${key}":"${val}", "family":"${this.type}"%7D`
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
  },

  created() {
    this.fetchData()
  }

}
