'use strict'

import Snapshots from 'factories/snapshots'
import VueTable from 'mixins/vue-table'
import Datacenters from 'factories/datacenters'
import FectherEntity from 'services/fetchEntity'

export default {
  mixins: [VueTable],

  data: function () {
    return {
      entity: new Snapshots(),
      columns: ['name', 'datacenters', 'volume_id', 'volume_size', 'status', 'snapshot_id', 'progress', 'created_at', 'actions'],
      options: {
        filterable: ['name', 'datacenters', 'vpc_id', 'family'],
        listColumns: {
          datacenters: []
        }
      }
    }
  },

  methods: {
    prepared(data) {
      return data.map((d) => {
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
