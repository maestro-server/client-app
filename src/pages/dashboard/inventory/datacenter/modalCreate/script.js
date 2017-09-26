'use strict'
import Modals from 'mixins/modals'
import Datacenters from 'factories/datacenters'
import Adminer from 'factories/adminer'
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
      this.addItems(val, 'regions')
    },
    zone (val) {
      this.addItems(val, 'zones')
    }
  },

  methods: {
    afterShow () {
      this.text.title = this.create ? 'Create new Datacenter' : `Edit ${this.model.name} datacenter`
    },

    createLoad () {
      this.regions = []
      this.zones = []
    },

    editLoad () {
      this.$set(this, 'provider', this.model.provider)
      this.$set(this, 'regions', this.model.regions)
      this.$set(this, 'zones', this.model.zones)
      this.$set(this, 'ownProvider', this.model.metas.ownProvider)
    },

    setupModel () {
      this.model.regions = this.regions
      this.model.zones = this.zones
      this.model.provider = this.provider
      this.model.metas = {ownProvider: this.ownProvider}
    },

    createSave () {
      this.setupModel()

      FectherEntity(Datacenters)()
        .create(this.finishJob, this.model)
    },

    editSave () {
      this.setupModel()

      FectherEntity(Datacenters)()
        .update(this.finishJob, this.model)
    },

    changeProvider(bool) {
      this.provider = null
      this.ownProvider = bool
      this.createLoad()
    },

    addItems(item, entity) {
      const exist = _.filter(this[entity], e=>e==item).length
      if (entity && !exist) {
        this[entity].push(item)
      }
    },

    clearItems(data) {
      if(data != this.provider) {
        this.zones = []
        this.regions = []
      }
    },

    addItemToTmpList(path) {
      this[path] = []
      this[`showModal${path.toUpperCase()}`] = false
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
    }

  },

  created () {
    FectherEntity(Adminer)({persistence: 'local', time: 42400})
    .find(this.fetchAdminer, {key: 'datacenter_options'})
  }

}
