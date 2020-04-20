'use strict'
import _ from 'lodash'

import Clients from 'factories/clients'
import System from 'factories/system'
import FectherEntity from 'services/fetchEntity'
import CacheManager from 'services/cacheManager'

import ViewSingle from 'mixins/view-single'

export default {
  mixins: [ViewSingle],

  data: function () {
    return {
      entity: Clients,
      model: { tags: [], contacts: [] },
      list_system: []
    }
  },

  computed: {
    MMembers () {
      return this.$parent.$refs.modal_members
    },
    filtered () {
      return _.omit(this.model, ['owner', 'roles', '_links', 'contacts', 'list_system', 'team'])
    }
  },

  methods: {
    editM: function () {
      const { list_system } = this

      this.MMembers
        .onFinishCallBack((e) => {
          this.$set(this, 'list_system', _.get(e, 'list_system', []))
          CacheManager({ k: `client_system_${this.model._id}` }).remove()
        })
        .show(_.merge(this.model, { list_system }))
    },

    fetchSystem (force = true) {
      if (this.id) {
        FectherEntity(System)({ force })
          .find((e) => {
            this.$set(this, 'list_system', _.get(e, 'data.items', []))
          }, { "clients._id": this.id })
      }
    }
  },

  created () {
    this.fetchSystem()
  }
}
