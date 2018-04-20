'use strict'
import _ from 'lodash'

import Servers from 'factories/servers'
import ViewSingle from 'mixins/view-single'
import modalConfig from '../modalServerConfig/create'

export default {
  mixins: [ViewSingle],

  components: {
    modalConfig
  },

  data: function () {
    return {
      entity: Servers,
      model: {tags: [], auth:[], services:[], storage: [], logs: [], os:{base:null}, datacenters:{name:null}, active:true}
    }
  },

  computed: {
    MCreateConfigServer() {
      return this.$refs.modal_config
    },
    filtered() {
      return _.omit(this.model, ['owner', 'roles', 'active', '_links'])
    },
    viewDisplayer() {
      return [
        {val: this.model.active ? "Active" : "Terminated", type: this.model.active ? "success" : "danger"},
        {val: _.get(this.model, 'environment')},
        {val: _.get(this.model, 'role')},
        {val: _.get(this.model, 'os.base', false)},
        {val: _.get(this.model, 'datacenters.name', false)},
        {val: _.get(this.model, 'ipv4_private')}
      ]
    }
  },

  methods: {
    callConfig(item) {
      this.MCreateConfigServer
        .onFinishCallBack(() => this.fetchData(this.id))
        .show(item)
    }
  }
}
