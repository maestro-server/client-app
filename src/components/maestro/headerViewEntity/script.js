'use strict'

export default {
  props: {
    name: {type: String},
    label: {type: String},
    visibility: {type: Object, default: () => ({"create": true, "edit": true, "delete": true})}
  },

  methods: {
    event(emitter, item = null) {
      this.$emit(emitter, item)
    }
  }
}
