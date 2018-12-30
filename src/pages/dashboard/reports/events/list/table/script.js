'use strict'

import Events from 'factories/events'
import VueTable from 'mixins/vue-table'

export default {
  mixins: [VueTable],

  data: function () {
    return {
      entity: new Events(),
      columns: ['msg', 'context', 'updated_at', 'actions'],
      options: {
        orderBy: {column: 'updated_at', ascending: false},
        sortable: ['created_at'],
        filterable: ['msg', 'context'],
        headings: {
          updated_at: 'Updated At'
        }
      }
    }
  },

  methods: {
    prepared(data) {
      return data.map((d) => {
        d.updated_at = new Date(d.updated_at).toLocaleString()
        return d
      })
    }
  }
}
