'use strict'
export default {
  props: {
    basket: {},
    label: { type: String },
    icons: { type: String, default: 'fa-cogs' },
    index: { default: 0 },
    showManangerBTN: { type: Boolean, default: true }
  },

  methods: {
    callEdit () {
      this.$emit('edit', this.index)
    }
  }
}
