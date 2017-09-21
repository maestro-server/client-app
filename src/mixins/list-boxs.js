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
    MAcl() {
      return this.$parent.$refs.modal_acl
    },
    MDelete() {
      return this.$parent.$refs.modal_delete
    }
  },

  methods: {
    fetchData (force=true) {
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

    aclE (entity) {
      this.MAcl
        .onFinishCallBack(() => this.fetchData(true))
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
