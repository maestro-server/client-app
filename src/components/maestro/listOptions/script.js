'use strict'

export default {
  props: {
    lists: {}
  },

  methods: {
    callStep (prv) {
      this.$emit('click', prv)
    }
  }
}
