'use strict'

import Volumes from 'factories/volumes'
import VueTable from 'mixins/vue-table'

export default {
  mixins: [VueTable],

  data: function () {
    return {
      entity: new Volumes(),
      columns: ['name', 'size', 'iops', 'volume_id', 'datacenter', 'status', 'actions'],
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
