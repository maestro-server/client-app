'use strict'
import _ from 'lodash'

import Clients from 'factories/clients'
import System from 'factories/system'
import FectherEntity from 'services/fetchEntity'
import CacheManager from 'services/cacheManager'

export default {

  data: function () {
    return {
      id: null,
      model: {tags: [], contacts:[], list_system:[]},
      team: false,
      showJson:false
    }
  },

  computed: {
    MCreate() {
      return this.$parent.$refs.modal_create
    },
    MMembers() {
      return this.$parent.$refs.modal_members
    },
    MDelete() {
      return this.$parent.$refs.modal_delete
    },
    filtered() {
      return _.omit(this.model, ['owner', 'roles', 'active', '_links', 'contacts', 'list_system', 'team'])
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

    editM: function (entity) {
      const {team} = this

      this.MMembers
        .setupSteps(1, 1, 1)
        .onFinishCallBack(CacheManager({k: `client_system_${this.model._id}`}).remove)
        .show(_.merge(entity, {team}))
    },

    deleteE: function (entity) {
      const {team} = this

      this.MDelete
        .onFinishCallBack(() => this.$router.push('/dashboard/inventory/system'))
        .show(_.merge(entity, {team}))
    },

    fetchData: function (id) {
      if (id) {
        FectherEntity(Clients)({k: 'client_' + id})
          .findOne((e) => {
            this.$set(this, 'model', e.data)
          }, id)
      }
    },

    fetchSystem(id, force = true) {
      if (id) {
        FectherEntity(System)({k: 'client_system_'+id, force})
          .find((e) => {
            this.$set(this.model, 'list_system', _.get(e, 'data.items', []))
          }, {"clients._id": id})
      }
    }
  },

  created() {
    this.fetchData(this.$route.params.id)
    this.fetchSystem(this.$route.params.id)

    if (_.has(this.$route, 'query.team_id')) {
      this.team = {
        '_id': this.$route.query.team_id,
        'name': this.$route.query.team_name
      }
    }
  }
}
