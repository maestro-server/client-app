'use strict'

export default {
  data: function () {
    return {
      version: 0.0
    }
  },

  created() {
    this.version = this.$store.getters.get_version
  }
}
