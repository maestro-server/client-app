'use strict'
import _ from 'lodash'

import Servers from 'factories/servers'
import FectherEntity from 'services/fetchEntity'

export default {

  data: function () {
    return {
      id: null,
      model: {tags: [], auth:[], services:[], storage: [], logs: [], os:{base:null}, dc:{name:null}, active:true},
      team: false,
      showJson:false
    }
  },

  computed: {
    MCreate() {
      return this.$parent.$refs.modal_create
    },
    MDelete() {
      return this.$parent.$refs.modal_delete
    },
    activeShow() {
      return this.model.active ? "success" : "danger"
    },
    activeLabel() {
      return this.model.active ? "Active" : "Desactive"
    },
    filtered() {
      return _.omit(this.model, ['owner', 'roles', 'active', '_links'])
    }
  },

  methods: {
    existGet(key, path) {
      return _.get(key, path, false)
    },

    isObject: function (value) {
      return _.isPlainObject(value);
    },

    isArray: function (value) {
      return _.isArray(value);
    },

    isString: function (value) {
      return _.isString(value);
    },

    editE: function (entity, index=0) {
      const {team} = this

      this.MCreate
        .setupSteps(1, 1, 1)
        .setTabShow(index)
        .onFinishCallBack(() => this.fetchData(entity._id))
        .show(_.merge(entity, {team}))
    },

    deleteE: function (entity) {
      const {team} = this

      this.MDelete
        .onFinishCallBack(() => this.$router.push('/dashboard/inventory/servers'))
        .show(_.merge(entity, {team}))
    },

    fetchData: function (id) {
      FectherEntity(Servers)(this)({k: 'server_' + id})
        .findOne((e) => {
          this.$set(this, 'model', e.data)
        }, id)
    }
  },

  created() {
    this.fetchData(this.$route.params.id)

    if (_.has(this.$route, 'query.team_id')) {
      this.team = {
        '_id': this.$route.query.team_id,
        'name': this.$route.query.team_name
      }
    }
  }
}
