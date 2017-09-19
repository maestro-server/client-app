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
      model: {tags: [], servers:[], deploy:[]},
      list_servers: []
    }
  },

  computed: {
    filtered() {
      return _.omit(this.model, ['owner', 'roles', 'active', '_links', 'servers'])
    },
    viewDisplayer() {
      return [
        {val: this.model.environment, type: 'primary'},
        {val: this.model.language},
        {val: _.get(this.model, 'os.name', false)},
        {val: _.get(this.model, 'role.role', false)}
      ]
    }
  },

  methods: {
    fetchServers() {
      if (!_.isEmpty(this.model.servers)) {
        FectherEntity(Servers)({force: true})
          .find((e) => {
            this.$set(this, 'list_servers', _.get(e, 'data.items', []))
          }, {_id: this.model.servers})
      } else {
        this.$set(this, 'list_servers', [])
      }
    }
  },

  created() {
    this.$on('finishFetchData', this.fetchServers)
  }
}
