'use strict'

import titleTenant from 'src/resources/libs/formatTitleTenant'

export default {
  props: {
    label: {type: String},
    showAddBtn: {type: Boolean, default: true},
  },

  computed: {
    title() {
      return titleTenant(this.label + 's', 'My '+this.label+'s')
    }
  },

  methods: {
    add () {
      this.$emit('add')
    }
  }
}
