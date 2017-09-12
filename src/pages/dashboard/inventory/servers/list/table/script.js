'use strict'

import _ from 'lodash'
import Servers from 'factories/servers'
import Adminer from 'factories/adminer'
import Datacenters from 'factories/datacenters'
import Login from 'services/login'
import formatAdminer from 'src/resources/libs/formatAdminerData'
import FectherEntity from 'services/fetchEntity'

export default {
  data: function () {
    return {
      items: [],
      columns: ['hostname', 'ipv4_private', 'os', 'datacenters', 'environment', 'role', 'auth', 'user', 'updated_at', 'created_at', 'actions'],
      options: {
        headers: {Authorization: Login.Authorization()},
        responseAdapter: (resp) => ({
            data: this.prepared(resp.data.items),
            count: resp.data.found
          }
        ),
        filterable: ['hostname', 'ipv4_private', 'os', 'datacenters', 'role', 'environment', 'auth', 'user'],
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

  computed: {
    url() {
      const url = new Servers().getUrl()
      return `${API_URL}${url}`
    }
  },

  methods: {
    prepared(data) {
      return data.map((d) => {
        d.os = `${_.get(d, 'os.base', '')} ${_.get(d, 'os.dist', '')}`
        d.datacenters = _.get(d, 'datacenters.name', '-')

        d.user = _.reduce(d.auth, (o, f, k)=>this.viewReducer(o, f, k, 'username'), "")
        d.auth = _.reduce(d.auth, (o, f, k)=>this.viewReducer(o, f, k, 'type'), "")

        d.updated_at = new Date(d.updated_at).toLocaleString()
        d.created_at = new Date(d.created_at).toLocaleString()
        return d
      })
    },

    viewReducer(old, obj, key, fielder) {
      const str = key > 0 ? "|" : ""
      return `${old} ${str} ${obj[fielder]}`;
    },

    fetchAdminer(e) {
      const data = formatAdminer(e)
      _.forEach(this.options.listColumns, (val, key) => {
        const list = _.get(data, key)

        if (!_.isEmpty(list)) {
          this.options.listColumns[key] = list.map(item => ({text: item}))
        }
      })
    },

    fetchDatacenter(e) {
      const data = _.get(e, 'data.items')
      if (!_.isEmpty(data)) {
        this.options.listColumns.datacenters = data.map(item => ({text: item.name}))
      }
    },

    editP(data) {
      this.$parent.editE(data)
    },

    deleteP(data) {
      this.$parent.deleteE(data)
    }
  },

  created() {
    FectherEntity(Adminer)({k: 'server_options', persistence: 'local', time: 2840})
      .find(this.fetchAdminer, {key: 'server_options'})

    FectherEntity(Datacenters)({k: 'datacenter'})
      .find(this.fetchDatacenter)
  }
}
