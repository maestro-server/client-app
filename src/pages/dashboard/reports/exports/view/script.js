'use strict'

import Reports from 'factories/reports'
import formatDate from 'mixins/formatDate'
import ViewSingle from 'mixins/view-single'
import { EventBus } from "../../../../../resources/bus/bus-general";

export default {
  mixins: [ViewSingle, formatDate],

  data: function () {
    return {
      entity: Reports,
      model: { tags: [] }
    }
  },

  computed: {
    MMembers () {
      return this.$parent.$refs.modal_members
    }
  },

  created () {
    this.id = this.$route.params.id
    EventBus.$on(`reports-${this.id}`, this.fetchData)
  },

  destroyed () {
    EventBus.$off(`reports-${this.id}`, this.fetchData)
  }
}
