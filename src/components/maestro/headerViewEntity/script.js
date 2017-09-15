'use strict'

export default {
  props: {
    name: {type: String},
    label: {type: String}
  },

  methods: {
    edit () {
      this.$emit('edit')
    },
    del () {
      this.$emit('del')
    }
  }
}
