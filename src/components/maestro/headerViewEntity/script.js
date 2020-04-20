'use strict'

export default {
  props: {
    name: { type: String },
    id: { type: String, default: null },
    entity: { type: String, default: null },
    label: { type: String },
    visibility: { type: Object, default: () => ({ create: true, edit: true, delete: true, track: true }) }
  },

  methods: {
    event (emitter, item = null) {
      this.$emit(emitter, item)
    }
  }
}
