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

  methods: {
    formatDate(date) {
      return new Date(date).toLocaleString()
    }
  },

  created() {
    this.id = this.$route.params.id
    EventBus.$on(`reports-${this.id}`, this.fetchData)
  },

  destroyed() {
    EventBus.$off(`reports-${this.id}`, this.fetchData)
  }
}
