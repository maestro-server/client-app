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
      name: "Connection"
    }
  },

  methods:{
    onUpdate() {
      this.$refs.svTable.$refs.vTable.refresh();
    }
  },

  created() {
    EventBus.$on('connections-update', this.onUpdate)
  },

  destroyed() {
    EventBus.$off('connections-update', this.onUpdate)
  }
}

