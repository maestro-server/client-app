'use strict'
import Reports from 'factories/reports'
import ViewSingle from 'mixins/view-single'
import {EventBus} from "../../../../../resources/bus/bus-general";

export default {
  mixins: [ViewSingle],

  data: function () {
    return {
      entity: Reports,
      model: {tags: []}
    }
  },

  computed: {
    MMembers() {
      return this.$parent.$refs.modal_members
    }
  },

  created() {
    EventBus.$on('reports-update', this.fetchData)
  },

  destroyed() {
    EventBus.$off('reports-update', this.fetchData)
  }
}
