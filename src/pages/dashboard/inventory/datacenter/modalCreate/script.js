'use strict'
import Modals from 'mixins/modals'
import Datacenters from 'factories/datacenters'
import Adminer from 'factories/adminer'
import formatAdminer from 'src/resources/libs/formatAdminerData'
import FectherEntity from 'services/fetchEntity'


export default {
  mixins: [Modals],

  data () {
    return {
      showModalRegions: false,
      showModalZones: false,
      ownProvider: false,
      provider: null,
      regions: [],
      regionT: null,
      region: null,
      zones: [],
      zoneT: null,
      zone: null,
      auth: {},
      options: {provider: [], connections: [], regions:[], zones:[]}
    }
  },

  watch: {
    region (val) {
      this.addRegions(val)
    },
    zone (val) {
      this.addZones(val)
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

      this.create ? this.resetDC() : this.editLoad()
    },

    editLoad () {
      this.$set(this, 'provider', this.model.provider)
      this.$set(this, 'regions', this.model.regions)
      this.$set(this, 'zones', this.model.zones)
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

    /*
    Regions functions
     */

    setupModalRegions() {
      this.showModalRegions = true
      this.options.regions = []
      if (this.options.baser.hasOwnProperty(this.provider)) {
        this.options.regions = this.options.baser[this.provider].map(e => e.region)
      }
    },

    addRegions(region) {
      const exist = _.filter(this.regions, e=>e==region).length
      if (region && !exist) {
        this.regions.push(region)
      }
    },

    addTegionT() {
      this.addRegions(this.regionT)
      this.regionT=null
    },

    deleteRegions(key) {
      this.regions.splice(key, 1)
    },

    clearRegions(data) {
      if(data != this.provider) {
        this.zones = []
        this.regions = []
      }
    },

    submitRegions() {
      this.setupZones()
      this.showModalRegions = false
    },

    /*
    Zones functions
     */

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
      this.options.zones = _.clone(arr)
    },

    addZones(zone) {
      const exist = _.filter(this.zones, e=>e==zone).length
      if (zone && !exist) {
        this.zones.push(zone)
      }
    },

    addZoneT() {
      this.addZones(this.zoneT)
      this.zoneT=null
    },

    deleteZones(key) {
      this.zones.splice(key, 1)
    },

    clearZones() {
      this.zones = []
      this.showModalZones = false
    },

    fetchAdminer (e) {
      _.assign(this.options, formatAdminer(e))
    },

  },

  created () {
    FectherEntity(Adminer)(this)({k: 'datacenter_options', persistence: 'local', time: 42400})
    .find(this.fetchAdminer, {key: 'datacenter_options'})
  }

}
