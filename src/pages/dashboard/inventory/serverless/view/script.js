'use strict'
import _ from 'lodash'

import Applications from 'factories/applications'
import ViewSingle from 'mixins/view-single'

export default {
  mixins: [ViewSingle],

  data: function () {
    return {
      entity: Applications,
      label: 'Serverless',
      model: {tags: [], servers:[]},
      list_servers: [],
      rollbackRoute: 'serverless'
    }
  },

  computed: {
    filtered() {
      return _.omit(this.model, ['owner', 'roles', 'active', '_links', 'servers'])
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
  }
}
