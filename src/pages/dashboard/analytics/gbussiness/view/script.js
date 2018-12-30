'use strict'
import Graphs from 'factories/graphs'
import ViewSingle from 'mixins/view-single'
import modalShared from '../modalShared/shared'
import {EventBus} from "../../../../../resources/bus/bus-general";

export default {
  mixins: [ViewSingle],

  components: {
    modalShared
  },

  computed: {
    MShared() {
      return this.$refs.modal_shared
    },
  },

  data: function () {
    return {
      entity: Graphs,
      model: {}
    }
  },

  methods: {
    editS: function () {
      this.MShared
        .onFinishCallBack(() => this.fetchData(this.id))
        .show(this.model)
    }
  },

  created() {
    this.id = this.$route.params.id
    EventBus.$on(`analytics-${this.id}`, this.fetchData)
  },

  destroyed() {
    EventBus.$off(`analytics-${this.id}`, this.fetchData)
  }
}
