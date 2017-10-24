'use strict'

import VueTable from 'mixins/vue-table'
import Providers from 'factories/providers'


export default {
  mixins: [VueTable],

  data: function () {
    return {
      entity: new Providers(),
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
