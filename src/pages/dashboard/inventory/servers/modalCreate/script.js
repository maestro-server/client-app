'use strict'
// import _ from 'lodash'
import Modals from 'mixins/modals'
import Servers from 'factories/servers'

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
      server: {status: "Active",  os: {base: null, dist: null, version: null}, storage:[], auth:[], services: [], tags: [], dc: {}},
      options: {
        serverType: ['Virtual', 'Exalogic', 'Exadata', 'Physical', 'PSeries'],
        status: ['Active', 'Desactive', 'Avaliable'],
        auths: ['PKI', 'AD', 'LDAP', 'Password'],
        env: ['Production', 'Staging', 'Development', 'UTA'],
        role: ['Application', 'Container', 'Database', 'Hybrid'],
        os: ['Linux', 'Windows', 'Solaris', 'FreeBSD', 'MacOS'],
        services: ["Apache HTTPD", "Nginx", "Docker", "Oracle Database", 'MySQL'],
        datacenter: []
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

  }

}
