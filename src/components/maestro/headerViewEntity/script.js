'use strict'

export default {
  props: {
    name: {type: String},
    label: {type: String}
  },

  methods: {
    event(emitter, item = null) {
      this.$emit(emitter, item)
    }
  }
}
