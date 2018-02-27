'use strict'
import _ from 'lodash'

import Applications from 'factories/applications'

import ViewSingle from 'mixins/view-single'

export default {
  mixins: [ViewSingle],

  data: function () {
    return {
      entity: Applications,
      label: 'Brokers',
      model: {tags: [], servers:[]},
      list_servers: [],
      list_targets: [],
      rollbackRoute: 'ci-cd'
    }
  },

  computed: {
    filtered() {
      return _.omit(this.model, ['owner', 'roles', 'active', '_links', 'servers', 'targets'])
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
      this.fetchServersF('targets', Applications)
    }
  },

  created() {
    this.$on('finishFetchData', this.fetchServers)
  }
}
