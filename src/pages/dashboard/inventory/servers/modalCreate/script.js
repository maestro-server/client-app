'use strict'
// import _ from 'lodash'
import Modals from 'mixins/modals'
import Servers from 'factories/servers'
import Adminer from 'factories/adminer'
import formatAdminer from 'src/resources/libs/formatAdminerData'
import FectherEntity from 'services/fetchEntity'

import tabDatacenter from './tab_datacenter'
import tabAuth from './tab_auth'
import tabSetups from './tab_setups'
import tabStorage from './tab_storage'
import tabTags from './tab_tags'

export default {
  mixins: [Modals],

  components: {
    tabDatacenter,
    tabAuth,
    tabSetups,
    tabStorage,
    tabTags
  },

  data: function () {
    return {
      zone: null,
      showModalDC: false,
      showModalZones: false,
      server: {status: "Active", storage:[], auth:[], services: [], tags: [], dc: {}},
      os: {base: null, dist: null, version: null},
      options: {
        status:[],
        environment:[],
        os:[],
        serverType:[],
        storage:[],
        auths:[],
        services:[],
        tags:[]
      }
    }
  },

  methods: {
    afterShow () {
      this.text.title =  this.create ? 'Create new Server' : `Edit ${this.model.name} server`

      if(!this.create) {
        this.editLoad()
      }
    },

    editLoad () {
      const {_id} = this.model
      FectherEntity(Servers)(this)({k: 'server_'+_id})
      .findOne((e) => this.model = e.data, _id)

      _.defaults(this.model, {
        os: {base:null}
      })

      this.$set(this, 'server', this.model)
      this.$set(this, 'os', this.model.os)
    },

    setupModel () {
      this.model.os = this.os
      this.model = this.server
    },

    createSave () {
      this.setupModel()

      new Servers(this.model)
      .authorization()
      .create(this.finishJob)
    },

    editSave () {
      this.setupModel()

      new Servers(this.model)
      .authorization()
      .patchID(this.model._id, this.finishJob)
    },

    setTeam(item) {
      this.$set(this.model, 'team', item)
      return this
    },

    teamSelected(item) {
      this.setTeam(item)
      this.model.input = ""
    },

    fetchData() {
      FectherEntity(Adminer)(this)({k: 'server_options', p: true})
      .find(this.fetchAdminer, {key: 'server_options'})
    },

    fetchAdminer (e) {
      this.options = formatAdminer(e)
    }
  },

  created() {
    this.fetchData()
  }

}
