'use strict'
import _ from 'lodash'

import Applications from 'factories/applications'
import Servers from 'factories/servers'
import FectherEntity from 'services/fetchEntity'

import ViewSingle from 'mixins/view-single'

export default {
  mixins: [ViewSingle],

  data: function () {
    return {
      entity: Applications,
      label: 'Cache',
      model: {tags: [], servers:[], targets:[]},
      list_servers: [],
      list_targets: []
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
      this.fetchServersF('targets')
    },

    fetchServersF(fielder) {
      if (!_.isEmpty(this.model[fielder])) {
        const data = 'list_'+fielder

        FectherEntity(Servers)({force: true})
          .find((e) => {
            this.$set(this, data, _.get(e, 'data.items', []))
          }, {_id: this.model[fielder]})
      } else {
        this.$set(this, data, [])
      }
    }
  },

  created() {
    this.$on('finishFetchData', this.fetchServers)
  }
}
