'use strict'
import _ from 'lodash'

import Applications from 'factories/applications'
import Servers from 'factories/servers'
import FectherEntity from 'services/fetchEntity'

export default {

  data: function () {
    return {
      id: null,
      model: {tags: [], servers:[], deploy:[]},
      list_servers: [],
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
    filtered() {
      return _.omit(this.model, ['owner', 'roles', 'active', '_links', 'servers'])
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
        .onFinishCallBack(() => this.$router.push('/dashboard/inventory/applications'))
        .show(_.merge(entity, {team}))
    },

    fetchData: function (id) {
      FectherEntity(Applications)(this)({k: 'applications_' + id})
        .findOne((e) => {
          this.$set(this, 'model', e.data)
          this.fetchServers()
        }, id)
    },

    fetchServers() {
      const {_id} = this.model

      if (!_.isEmpty(this.model.servers)) {
        FectherEntity(Servers)(this)({k: 'app_server_'+_id})
          .find((e) => {
            this.$set(this, 'list_servers', _.get(e, 'data.items', []))
          }, {_id: this.model.servers})
      }
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
