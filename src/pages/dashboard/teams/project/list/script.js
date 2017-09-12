'use strict'

import _ from 'lodash'
import Projects from 'factories/projects'
import FectherEntity from 'services/fetchEntity'

import titleTenant from 'src/resources/libs/formatTitleTenant'


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
      return titleTenant('Projects', 'My Projects')
    }
  },

  methods: {
    fetchData: function () {
      FectherEntity(Projects)({k: 'projects'})
        .find((e) => this.result = e.data)
    },

    addE: function () {
       this.MCreate
        .setupSteps(1,1,1)
        .onFinishCallBack(() => {this.fetchData()})
        .show()
    },

    editE: function (entity) {
      this.MCreate
        .setupSteps(1,1,1)
        .onFinishCallBack((e) => {
          _.merge(entity, e)
        })
        .show(entity)
    },

    deleteE: function (entity) {
      this.MDelete
        .onFinishCallBack(() => {
          const narr = this.result.items.filter(e => e != project)
          this.result.items = narr
        })
        .show(entity)
    },

    changePage (page) {
      this.fetchData({page})
    }
  },

  created () {
    this.fetchData()
  }
}
