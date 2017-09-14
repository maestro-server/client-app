'use strict'

export default {
  data: function () {
    return {
      value: []
    }
  },

  methods: {
    updaterEdit(data) {
      this.$set(this, 'value', data || [])
      this.$emit('update', this.value)
    },

    reset() {
      this.value = []
    }
  }
}
