'use strict'
export default {
  props: {
    label: { default: '', type: String },
    total_pages: {},
    items: { default: [] },
    initial_page: { default: 0, type: Number }
  },

  data: function () {
    return {
      current_page: this.initial_page
    }
  },

  methods: {
    event (emitter, item = null) {
      this.$emit(emitter, item)
    },

    changePage (page) {
      this.$emit('changePage', page)
    }
  }
}
