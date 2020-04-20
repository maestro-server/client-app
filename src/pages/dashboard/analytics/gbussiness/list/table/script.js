'use strict'

import _ from 'lodash'
import Graphs from 'factories/graphs'
import System from 'factories/system'
import FectherEntity from 'services/fetchEntity'

import VueTable from 'mixins/vue-table'

export default {
  mixins: [VueTable],

  data: function () {
    return {
      entity: new Graphs(),
      columns: ['status', 'name', 'lsystem', 'updated_at', 'created_at', 'actions'],
      options: {
        orderBy: { column: 'updated_at', ascending: false },
        filterable: ['name', 'lsystem'],
        listColumns: {
          lsystem: []
        },
        headings: {
          lsystem: "System",
          updated_at: 'Updated At',
          created_at: 'Created At'
        }
      }
    }
  },

  computed: {
    url () {
      return this.entity.getUrl() + '?type=bussiness'
    }
  },

  methods: {
    prepared (data) {
      return data.map((d) => {
        d.lsystem = _.reduce(d.systems, (o, f, k) => this.viewReducer(o, f, k, 'name'), "")
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

