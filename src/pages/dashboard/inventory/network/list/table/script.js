'use strict'

import Networks from 'factories/networks'
import VueTable from 'mixins/vue-table'
import Datacenters from 'factories/datacenters'
import FectherEntity from 'services/fetchEntity'

export default {
  mixins: [VueTable],

  data: function () {
    return {
      entity: new Networks(),
      columns: ['name',  'family', 'vpc_id', 'subnet_id', 'environment', 'datacenters', 'status', 'actions'],
      options: {
        filterable: ['name', 'datacenters', 'vpc_id', 'family'],
        listColumns: {
          datacenters: []
        },
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
        d.datacenters = _.get(d, 'datacenters.name', '-')
        return d
      })
    }
  },

  created() {
    FectherEntity(Datacenters)()
      .find(this.fetchData('datacenters'))
  }
}
