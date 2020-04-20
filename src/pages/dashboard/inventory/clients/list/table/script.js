'use strict'

import Clients from 'factories/clients'
import VueTable from 'mixins/vue-table'

export default {
  mixins: [VueTable],

  data: function () {
    return {
      entity: new Clients(),
      columns: ['name', 'lcontact', 'updated_at', 'created_at', 'actions'],
      options: {
        orderBy: { column: 'updated_at', ascending: false },
        filterable: ['name'],
        headings: {
          lcontact: 'Contacts',
          updated_at: 'Updated At',
          created_at: 'Created At'
        }
      }
    }
  },

  methods: {
    prepared (data) {
      return data.map((d) => {
        d.lcontact = _.reduce(d.contacts, (o, f, k) => this.viewReducer(o, f, k, 'channel'), "")

        d.updated_at = new Date(d.updated_at).toLocaleString()
        d.created_at = new Date(d.created_at).toLocaleString()
        return d
      })
    }
  }
}
