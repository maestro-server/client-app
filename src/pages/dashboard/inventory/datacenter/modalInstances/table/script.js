'use strict'

import _ from 'lodash'
import VueTable from 'mixins/vue-table'
import Datacenters from 'factories/datacenters'

export default {
  mixins: [VueTable],

  props: {
    dc_id: {}
  },

  data: function () {
    return {
      urlServers: `${new Datacenters().getUrl()}/${this.dc_id}/servers/`,
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
    },

    /*
    Before redirect need to cleanup, especially scroll bar
     */
    linkSingle(id) {
      this.$parent.$emit('closed')
      setTimeout(() => {
        const path = {name: 'servers.single', params: { id }}
        this.$router.push(path)
      }, 500);
    }
  }
}
