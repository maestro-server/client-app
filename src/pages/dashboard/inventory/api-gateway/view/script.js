'use strict'
import _ from 'lodash'

import Applications from 'factories/applications'
import ViewSingle from 'mixins/view-single'

export default {
  mixins: [ViewSingle],

  data: function () {
    return {
      entity: Applications,
      label: 'Api Gateway',
      model: {tags: [], servers:[], targets:[]},
      list_servers: [],
      list_targets: [],
      rollbackRoute: 'api-gateway'
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
