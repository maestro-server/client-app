'use strict'
// import _ from 'lodash'
import Modals from 'mixins/modals'
import Datacenters from 'factories/datacenters'
import Adminer from 'factories/adminer'
import formatAdminer from 'src/resources/libs/formatAdminerData'


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
      options: {}
    }
  },

  watch: {
    regions () {
      if(this.create)
        this.setupZones()
    },

    provider () {
      if(this.create)
        this.setupRegions()
    }
  },

  methods: {
    changeProvider(bool) {
      this.provider = null
      this.ownProvider = bool
      this.resetDC()
    },

    resetDC() {
      this.regions = []
      this.zones = []
    },

    setupModel () {
      this.model.regions = this.regions
      this.model.zones = this.zones
      this.model.provider = this.provider
      this.model.metas = {ownProvider: this.ownProvider}
    },

    afterShow () {
      this.text.title = this.create ? 'Create new Datacenter' : `Edit ${this.model.name} datacenter`

      _.defaults(this.model, {
        regions: [],
        zones: [],
        provider: null,
        metas: {ownProvider:false}
      })

      this.$set(this, 'regions', this.model.regions)
      this.$set(this, 'zones', this.model.zones)
      this.$set(this, 'provider', this.model.provider)
      this.$set(this, 'ownProvider', this.model.metas.ownProvider)
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
      if (this.options.baser.hasOwnProperty(this.provider)) {
        this.regions = this.options.baser[this.provider].map(e => e.region)
      }
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

  },

  created () {
    new Adminer({key: 'datacenter_options'})
      .authorization()
      .list((e) => {
        this.options = formatAdminer(e)
      })
  }

}
