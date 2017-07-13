'use strict'
import Applications from 'factories/applications'
import _ from 'lodash'

import modalCreate from '../modalCreate/create'
import modalDelete from '../modalDelete/delete'

export default {
  components: {
    modalCreate,
    modalDelete
  },

  data: function () {
    return {
      result: {
        items: []
      },
      team:false
    }
  },

  computed: {
    MCreate () {return this.$refs.modal_create},
    MDelete () {return this.$refs.modal_delete},
    title () {
      return this.team ? this.team.name+' Datacenters' : 'My Datacenters'
    }
  },

  methods: {
    cap(data) {
      return data.charAt(0).toUpperCase() + data.slice(1)
    },

    fetchData: function (query={}) {
      const {team} = this
      const filter = _.merge(query, {team})

      new Applications(filter)
      .authorization()
      .list((e) => {this.result = e.data})
    },

    addE: function () {
      const {team} = this

      this.MCreate
        .setupSteps(1,1,1)
        .onFinishCallBack(() => {this.fetchData()})
        .show({team})
    },

    editE: function (entity) {
      const {team} = this

      this.MCreate
        .setupSteps(1,1,1)
        .onFinishCallBack((e) => {
          entity.name = e.name
          entity.email = e.email
        })
        .show(_.merge(entity, {team}))
    },

    deleteE: function (entity) {
      const {team} = this

      this.MDelete
        .onFinishCallBack(() => {
          const narr = this.result.items.filter((e) => {
            return e != project
          })
          this.result.items = narr
        })
        .show(_.merge(entity, {team}))
    },

    changePage (page) {
      this.fetchData({page})
    }
  },

  created () {
    if(_.has(this.$route, 'query.team_id')) {
      this.team = {
        '_id': this.$route.query.team_id,
        'name': this.$route.query.team_name
      }
    }

    this.fetchData()
  }
}
