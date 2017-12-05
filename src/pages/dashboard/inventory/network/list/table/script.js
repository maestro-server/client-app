'use strict'

import Networks from 'factories/networks'
import VueTable from 'mixins/vue-table'

export default {
  mixins: [VueTable],

  data: function () {
    return {
      entity: new Networks(),
      columns: ['name',  'family', 'vpc_id', 'subnet_id', 'environment', 'datacenter', 'status', 'actions'],
      options: {
        filterable: ['name', 'vpc_id', 'family'],
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
        d.name = d.name || d.unique_id
        d.datacenter = _.get(d, 'datacenters.name', '-')
        return d
      })
    }
  }
}
