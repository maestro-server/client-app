'use strict'

import _ from 'lodash'
import Services from 'factories/services'
import FectherEntity from 'services/fetchEntity'

export default {
  methods: {
    fetchServicesOptions (family = null) {
      FectherEntity(Services)({ persistence: 'local' })
        .find(this.processOptions, { family, limit: 500 })
    },

    processOptions (options) {
      // eslint-disable-next-line eqeqeq
      if (options.status == 200 && !_.isEmpty(options.data.items)) {
        options.data.items.map(this.setPosition)
      }
    },

    setPosition (data) {
      const fielder = _.get(data, 'owner', false) ? 'third' : 'own'

      if (_.has(this.options, fielder)) {
        this.options[fielder].push(_.get(data, 'name'))
      }
    }
  }
}
