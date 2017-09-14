'use strict'

import titleTenant from 'src/resources/libs/formatTitleTenant'

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
    },
    title() {
      return titleTenant(this.name, 'My '+this.name)
    }
  },

  methods: {
    addE: function () {
      this.MCreate
        .onFinishCallBack(this.$refs.svTable.$refs.vTable.refresh)
        .show()
    },

    editE: function (entity) {
      this.MCreate
        .onFinishCallBack(this.$refs.svTable.$refs.vTable.refresh)
        .show(entity)
    },

    deleteE: function (entity) {
      this.MDelete
        .onFinishCallBack(this.$refs.svTable.$refs.vTable.refresh)
        .show(entity)
    }
  }
}
