'use strict'

import {EventBus} from "../../../resources/bus/bus-general";

export default {

  methods: {
    callNotify({type, title, msg}) {
      this.$refs.coToaster.callToast(type, title, msg)

    }
  },

  created() {
    EventBus.$on('call-notify', this.callNotify);
  },

  destroyed() {
    EventBus.$off('call-notify', this.callNotify)
  }
}
