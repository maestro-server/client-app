'use strict'

import Images from 'factories/images'
import VueTable from 'mixins/vue-table'

export default {
  mixins: [VueTable],

  data: function () {
    return {
      entity: new Images(),
      columns: ['name', 'datacenters', 'image_id', 'image_type', 'image_location', 'actions'],
      options: {
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
    prepared(data) {
      return data.map((d) => {
        d.datacenters = _.get(d, 'datacenters.name', '-')

        d.updated_at = new Date(d.updated_at).toLocaleString()
        d.created_at = new Date(d.created_at).toLocaleString()
        return d
      })
    }
  }
}
