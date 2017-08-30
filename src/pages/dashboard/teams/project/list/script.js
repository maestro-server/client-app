'use strict'

import _ from 'lodash'
import Projects from 'factories/projects'
import FectherEntity from 'services/fetchEntity'


export default {
  data: function () {
    return {
      result: {
        items: []
      },
      team:false
    }
  },

  computed: {
    MCreate () {return this.$parent.$refs.modal_create},
    MDelete () {return this.$parent.$refs.modal_delete},
    title () {
      return this.team ? this.team.name+' Projects' : 'My Projects'
    }
  },

  methods: {
    fetchData: function (query={}) {
      const {team} = this
      const filter = _.merge(query, {team})

      FectherEntity(Projects)(this)({k: 'projects'})
        .find((e) => this.result = e.data)
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
          _.merge(entity, e)
        })
        .show(_.merge(entity, {team}))
    },

    deleteE: function (entity) {
      const {team} = this

      this.MDelete
        .onFinishCallBack(() => {
          const narr = this.result.items.filter(e => e != project)
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
