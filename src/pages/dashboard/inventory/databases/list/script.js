'use strict'

import svTable from './table/table'
import ListTable from 'mixins/list-table'


export default {
  mixins: [ListTable],

  components: {
    svTable
  },

  computed: {
    MCreateChooose() {
      return this.$parent.$refs.modal_create2
    }
  },

  data: function () {
    return {
      name: "DataBase"
    }
  },

  methods: {
    editChoose: function () {
      this.MCreateChooose
        .onFinishCallBack(this.$refs.svTable.$refs.vTable.refresh)
        .show(this.model)
    }
  }
}
