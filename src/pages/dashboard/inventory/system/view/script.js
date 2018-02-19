'use strict'
import _ from 'lodash'

import System from 'factories/system'
import Applications from 'factories/applications'
import FectherEntity from 'services/fetchEntity'
import CacheManager from 'services/cacheManager'

import ViewSingle from 'mixins/view-single'

export default {
  mixins: [ViewSingle],

  data: function () {
    return {
      entity: System,
      list_apps: [],
      model: {name: null, description: null, links: [], applications:null, tags: [], check: [], clients: []}
    }
  },

  computed: {
    MMembers() {
      return this.$parent.$refs.modal_members
    },
    filtered() {
      return _.omit(this.model, ['owner', 'roles', 'active', '_links', 'clients', 'list_apps', 'teams'])
    }
  },

  methods: {
    editM: function () {
      const {list_apps} = this

      this.MMembers
        .onFinishCallBack((e)=>{
          this.$set(this, 'list_apps', _.get(e, 'list_apps', []))
          CacheManager({k: `applications_${this.model._id}_system._id`}).remove()
        })
        .show(_.merge(this.model, {list_apps}))
    },

    fetchApps(force = true) {
      if (this.id) {
        FectherEntity(Applications)({force})
          .find((e) => {
            this.$set(this, 'list_apps', _.get(e, 'data.items', []))
          }, {"system._id": this.id})
      }
    },

    slugApps(str) {
      return _.kebabCase(str)
    }
  },

  created() {
    this.fetchApps()
  }
}
