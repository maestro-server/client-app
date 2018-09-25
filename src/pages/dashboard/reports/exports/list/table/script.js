'use strict'

import Reports from 'factories/reports'
import VueTable from 'mixins/vue-table'

export default {
  mixins: [VueTable],

  data: function () {
    return {
      entity: new Reports(),
      columns: ['status', 'name', 'report', 'created_at', 'actions'],
      options: {
        filterable: ['name'],
        headings: {
          updated_at: 'Updated At',
          created_at: 'Created At'
        }
      }
    }
  },

  methods: {
    prepared(data) {
      return data.map((d) => {
        d.updated_at = new Date(d.updated_at).toLocaleString()
        d.created_at = new Date(d.created_at).toLocaleString()
        return d
      })
    }
  }
}
