'use strict'

import _ from 'lodash'
import VueTable from 'mixins/vue-table'

export default {
  mixins: [VueTable],

  props: {
    dc_id: {}
  },

  data: function () {
    return {
      urlServers: `${API_URL}datacenters/${this.dc_id}/servers/`,
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
