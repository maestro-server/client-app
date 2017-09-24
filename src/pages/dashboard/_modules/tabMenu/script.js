'use strict'
import _ from 'lodash'

export default {
  props: {
    list: {
      type: Object,
      default: {}
    },
    more: {
      default: false
    },
    base: {
      type: String
    },
  },

  methods: {
    url (last) {
      return `/${this.base}/${  last}`
    },
    isStr (str) {
      return typeof str == 'string'
    }
  },

  computed: {
    moreTitle() {
      const name = _
        .chain(this.$route.name)
        .split(".")
        .head()
        .value()

      return _.get(this.more, name, '+')
    }
  }
}
