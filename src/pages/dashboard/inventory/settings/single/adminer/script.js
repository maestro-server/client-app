'use strict'

import Adminer from 'factories/adminer'
import VueTable from 'mixins/vue-table'

export default {
  mixins: [VueTable],

  data: function () {
    return {
      entity: new Adminer(),
      columns: ['key', 'actions'],
      options: {
        filterable: ['key']
      }
    }
  },

  methods: {
    optP (data) {
      this.$parent.optE(data)
    },

    prepared (data) {
      return data.map((d) => {
        return d
      })
    }
  }
}
