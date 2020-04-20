'use strict'
import _ from 'lodash'
import Servers from 'factories/servers'
import Applications from 'factories/applications'
import modalConfig from '../modalServerConfig/create'

import ViewSingle from 'mixins/view-single'
import FectherEntity from 'services/fetchEntity'
import CacheManager from 'services/cacheManager'

export default {
  mixins: [ViewSingle],

  components: {
    modalConfig
  },

  data: function () {
    return {
      entity: Applications,
      label: 'DataBases',
      model: { tags: [], modal: null },
      list_servers: [],
      rollbackRoute: 'database'
    }
  },

  computed: {
    MDeps () {
      return this.$parent.$refs.modal_deps
    },
    MMembers () {
      return this.$parent.$refs.modal_members
    },
    filtered () {
      return _.omit(this.model, ['owner', 'roles', '_links'])
    },
    viewDisplayer () {
      return [
        { val: this.model.active ? "Up" : "Down", type: this.model.active ? "success" : "danger" },
        { val: this.model.environment, type: 'primary' },
        { val: this.model.status },
        { val: this.model.provider },
        { val: this.model.cluster },
        { val: this.model.dataguard }
      ]
    },
    MCreateConfigServer () {
      return this.$refs.modal_config
    }
  },

  methods: {
    editM: function () {
      this.MDeps
        .onFinishCallBack(() => this.fetchData(this.id))
        .show(this.model)
    },

    MModal (modal) {
      return this.$parent.$refs[`modal_${modal}`]
    },

    edit: function (index = 0) {
      const type = _.get(this.model, 'modal', 'create')

      this.MModal(type)
        .setTabShow(index)
        .onFinishCallBack(() => this.fetchData(this.id))
        .show(this.model)
    },

    callConfig (item) {
      this.MCreateConfigServer
        .onFinishCallBack(() => this.fetchData(this.id))
        .show(item)
    },

    recalculateIndex (idx) {
      return this.model.modal === 'oracle' ? idx + 1 : idx
    },

    editMS: function () {
      const { list_servers } = this

      this.MMembers
        .onFinishCallBack((e) => {
          this.$set(this, 'list_servers', _.get(e, 'list_servers', []))
          CacheManager({ k: `servers_${this.model._id}_application._id` }).remove()
        })
        .show(_.merge(this.model, { list_servers }))
    },

    fetchServers (force = true) {
      if (this.id) {
        FectherEntity(Servers)({ force })
          .find((e) => {
            this.$set(this, 'list_servers', _.get(e, 'data.items', []))
          }, { "applications._id": this.id })
      }
    }
  },

  created () {
    this.fetchServers()
  }
}
