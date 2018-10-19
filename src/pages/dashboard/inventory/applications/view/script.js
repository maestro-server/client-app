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
      model: {tags: [], servers:[], deploy:[], targets: []},
      list_servers: [],
      rollbackRoute: 'application'
    }
  },

  computed: {
    MDeps() {
      return this.$parent.$refs.modal_deps
    },
    filtered() {
      return _.omit(this.model, ['owner', 'roles', '_links', 'servers'])
    },
    viewDisplayer() {
      return [
        {val: this.model.environment, type: 'primary'},
        {val: this.model.language},
        {val: _.get(this.model, 'role.role', false)}
      ]
    }
  },

  methods: {
    editM: function () {
      this.MDeps
        .onFinishCallBack(() => this.fetchData(this.id))
        .show(this.model)
    },

    fetchServers() {
      this.fetchServersF('servers')
    }
  },

  created() {
    this.$on('finishFetchData', this.fetchServers)
  }
}
