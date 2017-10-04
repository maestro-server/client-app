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
      label: 'DataBases',
      model: {tags: [], servers:[], modal: null},
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
        {val: this.model.provider}
      ]
    }
  },

  methods: {
    fetchServers() {
      this.fetchServersF('servers')
    },

    MModal(modal) {
      return this.$parent.$refs[`modal_${modal}`]
    },

    edit: function (index=0) {
      const type = _.get(this.model, 'modal', 'create')

      this.MModal(type)
        .setTabShow(index)
        .onFinishCallBack(() => this.fetchData(this.id))
        .show(this.model)
    }
  },

  created() {
    this.$on('finishFetchData', this.fetchServers)
  }
}
