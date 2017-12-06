'use strict'

import _ from 'lodash'
import Servers from 'factories/servers'
import Adminer from 'factories/adminer'
import Datacenters from 'factories/datacenters'
import FectherEntity from 'services/fetchEntity'

import VueTable from 'mixins/vue-table'

export default {
  mixins: [VueTable],

  data: function () {
    return {
      entity: new Servers(),
      columns: ['hostname', 'ipv4_private', 'os', 'datacenters', 'environment', 'role', 'auth', 'updated_at', 'actions'],
      options: {
        filterable: ['hostname', 'ipv4_private', 'os', 'datacenters', 'role', 'environment', 'auth'],
        listColumns: {
          role: [],
          environment: [],
          os: [],
          datacenters: [],
          auth: []
        },
        headings: {
          ipv4_private: 'IP Private',
          updated_at: 'Updated At',
          created_at: 'Created At'
        }
      }
    }
  },

  methods: {
    prepared(data) {
      return data.map((d) => {
        d.os = `${_.get(d, 'os.base', '')} ${_.get(d, 'os.dist', '')}`
        d.datacenters = _.get(d, 'datacenters.name', '-')

        d.auth = _.reduce(d.auth, (o, f, k)=>this.viewReducer(o, f, k, 'type'), "")

        d.updated_at = new Date(d.updated_at).toLocaleString()
        d.created_at = new Date(d.created_at).toLocaleString()
        return d
      })
    }
  },

  created() {
    FectherEntity(Adminer)({persistence: 'local'})
      .find(this.fetchAdminer, {key: 'server_options'})

    FectherEntity(Adminer)({persistence: 'local'})
      .find(this.fetchAdminer, {key: 'env_options'})

    FectherEntity(Datacenters)()
      .find(this.fetchData('datacenters'))
  }
}
