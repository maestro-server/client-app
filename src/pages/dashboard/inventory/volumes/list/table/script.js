'use strict'

import Volumes from 'factories/volumes'
import VueTable from 'mixins/vue-table'
import Datacenters from 'factories/datacenters'
import FectherEntity from 'services/fetchEntity'

export default {
  mixins: [VueTable],

  data: function () {
    return {
      entity: new Volumes(),
      columns: ['name', 'size', 'iops', 'unique_id', 'datacenters', 'status', 'created_at', 'actions'],
      options: {
        filterable: ['name', 'unique_id', 'datacenters', 'vpc_id', 'family'],
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
