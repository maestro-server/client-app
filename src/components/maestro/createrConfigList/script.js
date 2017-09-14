'use strict'
export default {
  props: {
    basket: {},
    label: {type: String},
    icons: {type: String, default: 'fa-cogs'},
    index: {default: 0}
  },

  methods: {
    callConfig(item) {
      this.$emit('config', item)
    },

    callEdit() {
      this.$emit('edit', this.index)
    }
  }
}
