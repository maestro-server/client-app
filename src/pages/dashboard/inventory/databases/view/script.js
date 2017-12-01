'use strict'
import _ from 'lodash'

import Applications from 'factories/applications'
import modalConfig from '../modalServerConfig/create'

import ViewSingle from 'mixins/view-single'

export default {
  mixins: [ViewSingle],

  components: {
    modalConfig
  },

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
        {val: this.model.status},
        {val: this.model.provider},
        {val: this.model.cluster},
        {val: this.model.dataguard}
      ]
    },
    MCreateConfigServer() {
      return this.$refs.modal_config
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
    },

    callConfig(item) {
      this.MCreateConfigServer
        .onFinishCallBack(() => this.fetchData(this.id))
        .show(item)
    },

    recalculateIndex(idx) {
      return this.model.modal == 'oracle' ? idx+1 : idx
    }
  },

  created() {
    this.$on('finishFetchData', this.fetchServers)
  }
}
