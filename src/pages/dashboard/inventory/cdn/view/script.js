'use strict'
import _ from 'lodash'

import Applications from 'factories/applications'
import ViewSingle from 'mixins/view-single'

import Servers from 'factories/servers'
import FectherEntity from 'services/fetchEntity'
import CacheManager from 'services/cacheManager'

export default {
  mixins: [ViewSingle],

  data: function () {
    return {
      entity: Applications,
      label: 'CDNs',
      model: { tags: [], deps: [] },
      list_servers: [],
      rollbackRoute: 'cdn'
    }
  },

  computed: {
    MMembers () {
      return this.$parent.$refs.modal_members
    },
    filtered () {
      return _.omit(this.model, ['owner', 'roles', '_links', 'deps'])
    },
    viewDisplayer () {
      return [
        { val: this.model.active ? "Active" : "Desactive", type: this.model.active ? "success" : "danger" },
        { val: this.model.environment, type: 'primary' },
        { val: this.model.provider }
      ]
    }
  },

  methods: {
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
