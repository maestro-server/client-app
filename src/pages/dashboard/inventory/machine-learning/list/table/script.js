'use strict'

import _ from 'lodash'
import Applications from 'factories/applications'
import System from 'factories/system'
import Datacenters from 'factories/datacenters'
import FectherEntity from 'services/fetchEntity'

import VueTable from 'mixins/vue-table'

export default {
  mixins: [VueTable],

  data: function () {
    return {
      entity: new Applications(),
      columns: ['name', 'provider', 'ldatacenters', 'lsystem', 'environment', 'updated_at', 'created_at', 'actions'],
      options: {
        orderBy: { column: 'updated_at', ascending: false },
        filterable: ['name', 'provider', 'ldatacenters', 'environment', 'lsystem'],
        listColumns: {
          lsystem: [],
          ldatacenters: []
        },
        headings: {
          updated_at: 'Updated At',
          ldatacenters: "Datacenters",
          lsystem: "System",
          created_at: 'Created At'
        }
      }
    }
  },

  computed: {
    url () {
      return this.entity.getUrl() + '?family=MachineLearning'
    }
  },

  methods: {
    prepared (data) {
      return data.map((d) => {
        d.ldatacenters = _.get(d, 'datacenters.name', '-')

        d.lsystem = _.reduce(d.system, (o, f, k) => this.viewReducer(o, f, k, 'name'), "")

        d.updated_at = new Date(d.updated_at).toLocaleString()
        d.created_at = new Date(d.created_at).toLocaleString()
        return d
      })
    }
  },

  created () {
    FectherEntity(System)()
      .find(this.fetchData('lsystem'))

    FectherEntity(Datacenters)()
      .find(this.fetchData('ldatacenters'))
  }
}

