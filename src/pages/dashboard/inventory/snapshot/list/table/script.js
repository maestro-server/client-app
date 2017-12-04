'use strict'

import Snapshots from 'factories/snapshots'
import VueTable from 'mixins/vue-table'

export default {
  mixins: [VueTable],

  data: function () {
    return {
      entity: new Snapshots(),
      columns: ['name', 'datacenter', 'volume_id', 'volume_size', 'status', 'snapshot_id', 'progress', 'actions'],
      options: {
        filterable: ['name', 'vpc_id', 'family'],
      }
    }
  },

  methods: {
    prepared(data) {
      return data.map((d) => {
        d.datacenter = _.get(d, 'datacenters.name', '-')
        return d
      })
    }
  }
}
