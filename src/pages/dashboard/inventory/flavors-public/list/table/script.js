'use strict'

import FlavorsPublic from 'factories/flavorsPublic'
import VueTable from 'mixins/vue-table'

export default {
  mixins: [VueTable],

  data: function () {
    return {
      entity: new FlavorsPublic(),
      columns: ['name', 'api_name', 'provider', 'actions'],
      options: {
        filterable: ['name', 'api_name', 'provider'],
      }
    }
  },

  methods: {
    prepared(data) {
      return data.map((d) => {
        return d
      })
    }
  }
}
