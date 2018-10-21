'use strict'
import _ from 'lodash'

import Applications from 'factories/applications'

import ViewSingle from 'mixins/view-single'

export default {
  mixins: [ViewSingle],

  data: function () {
    return {
      entity: Applications,
      label: 'DNS',
      model: {tags: [], servers:[]},
      list_servers: [],
      list_targets: [],
      rollbackRoute: 'dns'
    }
  },

  computed: {
    filtered() {
      return _.omit(this.model, ['owner', 'roles', '_links', 'servers'])
    },
    viewDisplayer() {
      return [
        {val: this.model.environment, type: 'primary'},
        {val: this.model.provider}
      ]
    }
  },

  methods: {
    fetchServers() {
      this.fetchServersF('servers')
    }
  },

  created() {
    this.$on('finishFetchData', this.fetchServers)
  },

  destroyed() {
    this.$off('finishFetchData', this.fetchServers)
  }
}
