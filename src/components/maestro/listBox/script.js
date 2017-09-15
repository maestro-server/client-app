'use strict'
export default {
  props: {
    label: {default: '', type: String},
    total_pages: {},
    items: {default: []},
    initial_page: {default: 0, type: Number}
  },

  data: function () {
    return {
      current_page: this.initial_page
    }
  },

  methods: {
    edit(item) {
      this.$emit('edit', item)
    },

    del(item) {
      this.$emit('del', item)
    },

    changePage (page) {
      this.$emit('changePage', page)
    }
  }
}
