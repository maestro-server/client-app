'use strict'

import FectherEntity from 'services/fetchEntity'

export default {
  data: function () {
    return {
      id: null
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
    edit: function (index=0) {
      this.MCreate
        .setTabShow(index)
        .onFinishCallBack(() => this.fetchData(this.id))
        .show(this.model)
    },

    del: function () {
      const call = this.rollbackRoute || this.entity.name.toLowerCase()

      this.MDelete
        .onFinishCallBack(() => this.$router.push({name: call}))
        .show(this.model)
    },

    fetchData: function (force=true) {
      FectherEntity(this.entity)({force})
        .findOne((e) => {
          this.$set(this, 'model', e.data)
          this.$emit('finishFetchData')
        }, this.id)
    }
  },

  created() {
    this.id = this.$route.params.id
    this.fetchData()
  }
}
