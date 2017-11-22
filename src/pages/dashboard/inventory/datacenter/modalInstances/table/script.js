'use strict'

import _ from 'lodash'
import VueTable from 'mixins/vue-table'
import api_url from 'src/resources/libs/api_url'

export default {
  mixins: [VueTable],

  props: {
    dc_id: {}
  },

  data: function () {
    return {
      urlServers: `${api_url}datacenters/${this.dc_id}/servers/`,
      columns: ['hostname', 'ipv4_private', 'os', 'environment', 'role', 'actions'],
      options: {
        filterable: false,
        headings: {
          ipv4_private: 'IP Private'
        }
      }
    }
  },

  methods: {
    prepared(data) {
      return data.map((d) => {
        d.os = `${_.get(d, 'os.base', '')} ${_.get(d, 'os.dist', '')}`
        return d
      })
    }
  }
}
