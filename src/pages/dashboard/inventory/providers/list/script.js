'use strict'

import _ from 'lodash'

import Datacenters from 'factories/datacenters'
import FectherEntity from 'services/fetchEntity'

export default {
  data: function () {
    return {
      result: {
        items: []
      },
      team: false
    }
  },

  computed: {
    MCreate () {
      return this.$parent.$refs.modal_create
    },
    MDelete () {
      return this.$parent.$refs.modal_delete
    },
    MInstances () {
      return this.$parent.$refs.modal_instances
    },
    title () {
      return this.team ? this.team.name + ' Providers' : 'My Providers'
    }
  },

  methods: {
    fetchData (force=false) {
      FectherEntity(Datacenters)({k: 'datacenter', force})
      .find((e) => this.result = e.data)
    },

    addE () {
      const {team} = this

      this.MCreate
        .onFinishCallBack(() => {
          this.fetchData(true)
        })
        .show({team})
    },

    editE (entity) {
      const {team} = this

      this.MCreate
        .onFinishCallBack((e) => {
          _.merge(entity, e)
        })
        .show(_.merge(entity, {team}))
    },

    deleteE (entity) {
      const {team} = this

      this.MDelete
        .onFinishCallBack(() => {
          const narr = this.result.items.filter(e => e != entity)
          this.result.items = narr
        })
        .show(_.merge(entity, {team}))
    },

    seeInstances (entity) {
      const {team} = this

      this.MInstances
        .show(_.merge(entity, {team}))
    },

    changePage (page) {
      this.fetchData({page})
    }
  },

  created () {
    if (_.has(this.$route, 'query.team_id')) {
      this.team = {
        '_id': this.$route.query.team_id,
        'name': this.$route.query.team_name
      }
    }

    this.fetchData()
  }
}
