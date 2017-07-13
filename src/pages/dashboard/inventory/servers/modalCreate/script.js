'use strict'
// import _ from 'lodash'
import Modals from 'mixins/modals'
import Servers from 'factories/servers'
import Adminer from 'factories/adminer'

import formatAdminer from 'src/resources/libs/formatAdminerData'

export default {
  mixins: [Modals],

  data () {
    return {
      server: {status: "Active",  os: {base: null, dist: null, version: null}, storage:[], auth:[], services: [], dc: {}},
      storage: {name: null, size: null, root: null},
      service: {service: null, version: null},
      auth: {name: null, admin: null, type: null},
      datacenter: {name: null, zones: []},
      zone: null,
      URL: API_URL+"/teams/autocomplete?complete=",
      template: "{{item.name}} - <small>{{item.email}}</small>",
      showKeyForm: false,
      options: {
        serverType: ['Virtual', 'Exalogic', 'Exadata', 'Physical', 'PSeries'],
        status: ['Active', 'Desactive', 'Avaliable'],
        auths: ['PKI', 'AD', 'LDAP', 'Password'],
        env: ['Production', 'Staging', 'Development', 'UTA'],
        role: ['Application', 'Container', 'Database', 'Hybrid'],
        os: ['Linux', 'Windows', 'Solaris', 'FreeBSD', 'MacOS'],
        services: ["Apache HTTPD", "Nginx", "Docker", "Oracle Database", 'MySQL'],
        datacenter: []
      },
      showModalDC: false,
      showModalZones: false
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
    },

    addStorage() {
      if(this.storage.name && this.storage.size) {
        this.server.storage.push(this.storage)
        this.storage = {}
      }
    },

    deleteStorage(key) {
      this.server.storage.splice(key, 1)
    },

    addAuth() {
      if(this.auth.name && this.auth.type && this.auth.username) {
        this.server.auth.push(this.auth)
        this.auth = {}
      }
    },

    deleteAuth(key) {
      this.server.auth.splice(key, 1)
    },

    addServices() {
      if(this.service.name) {
        this.server.services.push(this.service)
        this.service = {}
      }
    },

    deleteServices(key) {
      this.server.services.splice(key, 1)
    },

    addZones() {
      if(this.zone) {
        this.datacenter.zones.push(this.zone)
        this.zone = ''
      }
    },

    deleteZones(key) {
      this.datacenter.zones.splice(key, 1)
    },

    clearZones() {
      this.datacenter.zones = []
      this.showModalZones = false
    }
  }

}
