'use strict'

import Network from 'factories/network'
import VueTable from 'mixins/vue-table'
import Datacenters from 'factories/datacenters'
import FectherEntity from 'services/fetchEntity'

export default {
  mixins: [VueTable],

  data: function () {
    return {
      entity: new Network(),
      columns: ['name', 'family', 'vpc_id', 'subnet_id', 'environment', 'ldatacenters', 'status', 'actions'],
      options: {
        orderBy: { column: 'updated_at', ascending: false },
        filterable: ['name', 'ldatacenters', 'vpc_id', 'family'],
        listColumns: {
          ldatacenters: []
        },
        headings: {
          updated_at: 'Updated At',
          ldatacenters: "Datacenters",
          created_at: 'Created At'
        }
      }
    }
  },

  methods: {
    prepared (data) {
      return data.map((d) => {
        d.name = d.name || d.unique_id
        d.ldatacenters = _.get(d, 'datacenters.name', '-')
        return d
      })
    }
  },

  created () {
    FectherEntity(Datacenters)()
      .find(this.fetchData('ldatacenters'))
  }
}
