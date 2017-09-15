'use strict'

import FectherEntity from 'services/fetchEntity'

export default {
  data: function () {
    return {
      result: {
        items: []
      }
    }
  },

  computed: {
    MCreate() {
      return this.$parent.$refs.modal_create
    },
    MDelete() {
      return this.$parent.$refs.modal_delete
    }
  },

  methods: {
    fetchData (force=false) {
      FectherEntity(this.entity)({force})
        .find((e) => this.result = e.data)
    },

    addE () {
      this.MCreate
        .onFinishCallBack(() => this.fetchData(true))
        .show()
    },

    editE (entity) {
      this.MCreate
        .onFinishCallBack((e) => _.merge(entity, e))
        .show(entity)
    },

    deleteE (entity) {
      this.MDelete
        .onFinishCallBack(() => this.fetchData(true))
        .show(entity)
    },

    seeInstances (entity) {
      this.MInstances
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
