'use strict'

import SingleService from 'mixins/single-service'
export default {
  mixins: [SingleService],

  props: {
    data: {},
    provider: {},
    prefix: {}
  },

  methods: {
    getPrefix(data) {
      return _.get(data, this.prefix)
    }
  },
}
