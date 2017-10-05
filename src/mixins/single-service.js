'use strict'

import _ from 'lodash'

export default {
  methods: {
    findServicesBy(model, provider) {
      return _.chain(model)
        .get('services', [])
        .filter(e=>e.name === provider)
        .value()
    },

    wrapperReduce(e) {
      return _.reduce(e, this.reduceBy)
    },

    reduceBy(f,l) {
      const bef = _.isString(l) ? l : ''
      return `${f} ${bef}`
    }
  }
}
