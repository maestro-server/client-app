'use strict'

import svTable from './table/table'
import ListTable from 'mixins/list-table'


export default {
  mixins: [ListTable],

  components: {
    svTable
  },

  computed: {
    MCreateChoose() {
      return this.$parent.$refs.modal_create2
    }
  },

  data: function () {
    return {
      name: "DataBase"
    }
  },

  methods: {
    MModal(modal) {
      return this.$parent.$refs[`modal_${modal}`]
    },

    editE: function (entity) {
      const type = _.get(entity, 'modal', 'create')

      this.MModal(type)
        .onFinishCallBack(this.$refs.svTable.$refs.vTable.refresh)
        .show(entity)
    },

    editChoose: function () {
      this.MCreateChoose
        .onFinishCallBack(this.$refs.svTable.$refs.vTable.refresh)
        .show(this.model)
    }
  }
}
