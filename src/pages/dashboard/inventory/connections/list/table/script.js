'use strict'

import VueTable from 'mixins/vue-table'
import Connections from 'factories/connections'


export default {
  mixins: [VueTable],

  data: function () {
    return {
      entity: new Connections(),
      columns: ['name', 'dc', 'updated_at', 'created_at', 'actions'],
      options: {
        filterable: ['name', 'dc'],
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
