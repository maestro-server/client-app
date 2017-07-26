'use strict'
// import _ from 'lodash'
import Modals from 'mixins/modals'
import Servers from 'factories/servers'
import Adminer from 'factories/adminer'
import formatAdminer from 'src/resources/libs/formatAdminerData'

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
      server: {status: "Active",  os: {base: null, dist: null, version: null}, storage:[], auth:[], services: [], tags: [], dc: {}},
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
    },

    createSave () {
      new Servers(this.model)
      .authorization()
      .create(this.finishJob)
    },

    editSave () {
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
    }
  },

  created() {
    new Adminer({key: 'server_options'})
      .authorization()
      .list((e) => {
        this.options = formatAdminer(e)
      })
  }

}
