'use strict'
import _ from 'lodash'

import Servers from 'factories/servers'
import FectherEntity from 'services/fetchEntity'

export default {

  data: function () {
    return {
      id: null,
      model: {},
      team:false
    }
  },

  computed: {
    MCreate () {return this.$parent.$refs.modal_create},
    MDelete () {return this.$parent.$refs.modal_delete},
    title () {
      return this.team ? this.team.name+' Servers' : 'My Servers'
    }
  },

  methods: {
    cap(data) {
      return data.charAt(0).toUpperCase() + data.slice(1)
    },

    addE: function () {
      const {team} = this

      this.MCreate
        .setupSteps(1,1,1)
        .onFinishCallBack(() => {this.$refs.svTable.$refs.vTable.refresh()})
        .show({team})
    },

    editE: function (entity) {
      const {team} = this

      this.MCreate
        .setupSteps(1,1,1)
        .onFinishCallBack(() => this.fetchData(entity._id))
        .show(_.merge(entity, {team}))
    },

    deleteE: function (entity) {
      const {team} = this

      this.MDelete
        .onFinishCallBack(() => {this.$route.push('/dashboard/inventory/servers')})
        .show(_.merge(entity, {team}))
    },

    fetchData: function (id) {
      FectherEntity(Servers)(this)({k: 'server_'+id})
      .findOne((e) => this.model = e.data, id)
    },
  },

  created () {
    this.fetchData(this.$route.params.id)

    if(_.has(this.$route, 'query.team_id')) {
      this.team = {
        '_id': this.$route.query.team_id,
        'name': this.$route.query.team_name
      }
    }
  }
}
