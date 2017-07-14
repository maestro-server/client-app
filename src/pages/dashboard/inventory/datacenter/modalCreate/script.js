'use strict'
// import _ from 'lodash'
import Modals from 'mixins/modals'
import Servers from 'factories/servers'


export default {
  mixins: [Modals],

  data () {
    return {
      showModalRegions: false,
      showModalZones: false,
      ownProvider: false,
      provider: null,
      regions: [],
      region: null,
      zones: [],
      zone: null,
      auth: {},
      options: {
        provider: ['AWS', 'OpenStack'],
        regions: [],
        zones: [],
        baser: {
          'AWS': [
            {region: 'sa-east-1 (South America)', zones: ['sa-east-1a', 'sa-east-1b', 'sa-east-1c']},
            {region: 'us-east-1 (US East (Virginia)', zones: ['us-east-1a', 'us-east-1b', 'us-east-1c']},
            {region: 'us-east-2 (US East (Ohio))', zones: ['us-east-2a', 'us-east-2b', 'us-east-2c']}
          ],
          'OpenStack': []
        },
        connections: {
          openstack: ['SSl without validation', 'SSL', 'Non-SSl']
        }
      }
    }
  },

  watch: {
    provider: function(val) {
      this.model.provider = val
    }
  },

  methods: {
    changeProvider(bool) {
      this.provider = ""
      this.regions = this.zones = this.options.zones = this.options.regions = []
      this.ownProvider = bool
    },

    afterShow () {
      this.text.title =  this.create ? 'Create new Datacenter' : `Edit ${this.model.name} datacenter`
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

    setupRegions() {
      if (this.options.baser.hasOwnProperty(this.provider))
        this.options.regions = this.options.baser[this.provider].map(e=>e.region)
    },

    setupZones() {
      if (this.regions.length > 0) {
        let arr = []
        this.options.baser[this.provider].map((reg) => {
          if(this.regions.indexOf(reg.region) > -1) {
            arr = arr.concat(reg.zones)
          }
        })

        this.options.zones = arr
      }
    },

    addZones() {
      if (this.zone) {
        this.options.zones.push(this.zone)
        this.zone = ''
      }
    },

    deleteZones(key) {
      this.options.zones.splice(key, 1)
    },

    clearZones() {
      this.options.zones = []
      this.showModalZones = false
    },

    addRegions() {
      if (this.region) {
        this.options.regions.push(this.region)
        this.region = ''
      }
    },

    deleteRegions(key) {
      this.options.regions.splice(key, 1)
    },

    clearRegions() {
      this.options.regions = []
      this.showModalRegions = false
    }

  }

}
