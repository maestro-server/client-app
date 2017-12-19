'use strict'

import Events from 'factories/events'
import VueTable from 'mixins/vue-table'

export default {
  mixins: [VueTable],

  data: function () {
    return {
      entity: new Events(),
      columns: ['msg', 'context', 'created_at', 'actions'],
      options: {
        orderBy: {column: 'created_at', ascending: false},
        sortable: ['created_at'],
        filterable: ['msg', 'context'],
        headings: {
          created_at: 'Created At'
        }
      }
    }
  },

  methods: {
    prepared(data) {
      return data.map((d) => {
        d.created_at = new Date(d.created_at).toLocaleString()
        return d
      })
    }
  }
}
