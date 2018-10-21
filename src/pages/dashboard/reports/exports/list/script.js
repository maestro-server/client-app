'use strict'

import svTable from './table/table'
import ListTable from 'mixins/list-table'
import {EventBus} from "../../../../../resources/bus/bus-general";

export default {
  mixins: [ListTable],

  components: {
    svTable
  },

  data: function () {
    return {
      name: "Report"
    }
  },

  methods:{
    onUpdate() {
      this.$refs.svTable.$refs.vTable.refresh();
    }
  },

  created() {
    EventBus.$on('reports-update', this.onUpdate)
  },

  destroyed() {
    EventBus.$off('reports-update', this.onUpdate)
  }
}
