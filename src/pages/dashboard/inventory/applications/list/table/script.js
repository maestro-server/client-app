'use strict'

import _ from 'lodash'
import Applications from 'factories/applications'
import System from 'factories/system'
import FectherEntity from 'services/fetchEntity'

import VueTable from 'mixins/vue-table'

export default {
  mixins: [VueTable],

  data: function () {
    return {
      entity: new Applications(),
      columns: ['name', 'lsystem', 'language', 'environment', 'qtddeploy', 'updated_at', 'created_at', 'actions'],
      options: {
        orderBy: { column: 'updated_at', ascending: false },
        filterable: ['name', 'language', 'environment', 'lsystem'],
        listColumns: {
          lsystem: []
        },
        headings: {
          updated_at: 'Updated At',
          lsystem: "System",
          qtddeploy: 'Deploys',
          created_at: 'Created At'
        }
      }
    }
  },

  computed: {
    url () {
      return this.entity.getUrl() + '?family=Application'
    }
  },

  methods: {
    prepared (data) {
      return data.map((d) => {
        d.qtddeploy = _.size(d.deploy)
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
  }
}

