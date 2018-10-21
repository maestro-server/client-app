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
      name: "Graph"
    }
  },

  methods:{
    onUpdate() {
      this.$refs.svTable.$refs.vTable.refresh();
    }
  },

  created() {
    EventBus.$on('analytics-update', this.onUpdate)
  },

  destroyed() {
    EventBus.$off('analytics-update', this.onUpdate)
  }
}
