'use strict'

import Modals from 'mixins/modals'
import Providers from 'factories/providers'
import Connections from 'factories/connections'
import Datacenters from 'factories/datacenters'
import FectherEntity from 'services/fetchEntity'

export default {
  mixins: [Modals],

  data: function() {
    return {
      provider: '',
      data: {conn:{}, name: null, provider: null, regions: [], actived: null, dc_id: null},
      providers: [],
      zones: [],
      regions: [],
      options: [],
      dcs: []
    }
  },

  computed: {
    toIcon: function() {
      return `icon-${this.provider.toLowerCase()}`
    }
  },

  methods: {
    afterShow () {
      this.text.title =  this.create ? 'Config access to provider' : `Edit or config ${this.model.name} provider`
    },

    setupModel () {
      this.model = _.pickBy(this.data, _.identity)
      this.model.name = `${this.model.dc} - ${this.reduceRegions(this.model.regions)}`
      this.model.provider = this.provider
    },

    reduceRegions(arr) {

      if(_.isArray(arr))
        return arr.reduce((e, f)=>`${e} ${f}`, '')
    },

    createLoad () {
      this.provider = ''
      this.data = {conn: {}}
    },

    createSave () {
      this.setupModel()

      FectherEntity(Connections)()
        .create(this.redirectConn, this.model)
    },

    redirectConn(result) {
      const id = _.get(result, 'data._id')

      if(id) {
        const path = {name: 'connections.single', params: {id}}
        this.$router.push(path)
      }

      this.finishJob(result)
    },

    editLoad () {
      this.$set(this, 'data', this.model)
      this.$set(this, 'provider', this.model.provider)
      this.fetchData(this.provider)
    },

    editSave () {
      this.setupModel()
      FectherEntity(Connections)()
        .update(this.finishJob, this.model)
    },

    callStep(prv) {
      this.provider = prv.label
      this.fetchData(prv.label)
    },

    fetchData: function (provider) {
      FectherEntity(Datacenters)({force: true})
        .find(this.fetchDatacenter, {provider})
    },

    fetchDatacenter(e) {
      const data = _.get(e, 'data.items')
      if (!_.isEmpty(data)) {
        this.options = data.map(item => ({value: item, label: item.name}))
        this.dcs = this.options.map(d => d.label)
      }
    },

    updateRegions(val){
      const dc = _.head(this.options.filter(d => d.label == val))
      this.regions = _.get(dc, 'value.regions', [])
      this.data.dc_id = _.get(dc, 'value._id', [])
    },

    fetchProviders(){
      FectherEntity(Providers)({force: true})
        .find(this.optsProviders)
    },

    optsProviders(data){
      this.providers = _.get(data, 'data.resources')
    }
  },

  created() {
    this.fetchProviders()
  }
}
