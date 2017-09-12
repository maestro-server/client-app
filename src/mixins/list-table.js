'use strict'

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
      return this.team ? this.team.name + ' Servers' : 'My Servers'
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
