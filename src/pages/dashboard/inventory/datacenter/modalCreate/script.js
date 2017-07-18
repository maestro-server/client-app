'use strict'
// import _ from 'lodash'
import Modals from 'mixins/modals'
import Datacenters from 'factories/datacenters'


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
    regions (val) {
      this.setupZones()
    }
  },

  methods: {
    changeProvider(bool) {
      this.provider = null
      this.regions = []
      this.zones = []
      this.ownProvider = bool
    },


    setupModel () {
      this.model.regions = this.regions
      this.model.zones = this.zones
      this.model.provider = this.provider
    },

    afterShow () {
      this.text.title = this.create ? 'Create new Datacenter' : `Edit ${this.model.name} datacenter`

      this.regions = this.model.regions || []
      this.zones = this.model.zones || []
      this.provider = this.model.provider
    },

    createSave () {
      this.setupModel()

      new Datacenters(this.model)
        .authorization()
        .create(this.finishJob)
    },

    editSave () {
      this.setupModel()

      new Datacenters(this.model)
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
        this.regions = this.options.baser[this.provider].map(e => e.region)
    },

    setupZones() {
      let arr = []

      if (this.options.baser.hasOwnProperty(this.provider) && this.regions.length > 0) {

        this.options.baser[this.provider].map((reg) => {
          if (this.regions.indexOf(reg.region) > -1) {
            arr = arr.concat(reg.zones)
          }
        })

      }

      this.zones = arr
    },

    addZones() {
      if (this.zone) {
        this.zones.push(this.zone)
        this.zone = ''
      }
    },

    deleteZones(key) {
      this.zones.splice(key, 1)
    },

    clearZones() {
      this.zones = []
      this.showModalZones = false
    },

    addRegions() {
      if (this.region) {
        this.regions.push(this.region)
        this.region = ''
      }
    },

    deleteRegions(key) {
      this.regions.splice(key, 1)
    },

    clearRegions() {
      this.regions = []
      this.showModalRegions = false
    }

  }

}
