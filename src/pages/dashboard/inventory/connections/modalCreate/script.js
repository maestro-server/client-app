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
      service: '',
      template: {},
      data: {conn:{}, name: null, provider: null, regions: [], actived: null, dc_id: ""},
      dcs: [],
      regions: [],
      options: {providers:[], dcs: []}
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
      this.model.name = `${this.service} - ${this.reduceRegions(this.model.regions)}`
      this.model.service = this.service
      this.model.provider = this.provider
    },

    reduceRegions(arr) {

      if(_.isArray(arr))
        return arr.reduce((e, f)=>`${e} ${f}`, '')
    },

    createLoad () {
      this.service = ''
      this.provider = ''
      this.template = {}
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
      this.$set(this, 'service', this.model.service)
      this.$set(this, 'provider', this.model.provider)
      this.setTemplate(this.model.service)
      this.fetchData(this.provider)
    },

    editSave () {
      this.setupModel()
      FectherEntity(Connections)()
        .update(this.finishJob, this.model)
    },

    callStep(prv) {
      this.provider = prv.dc
      this.service = prv.label
      this.fetchData(prv.dc)
      this.setTemplate(prv.label)
    },

    setTemplate(label) {
      if(label) {
        const obj = _.head(
          this.options.providers.filter(e => e.label == label)
        )
        this.$set(this, 'template', obj)
        this.checkAllRegion()
      }
    },

    checkAllRegion() {
      if (!_.get(this.template, 'template.dc[1]')) {
        this.$set(this.data, 'regions',  ['all'])
      }
    },

    fetchData: function (provider) {
      FectherEntity(Datacenters)({force: true})
        .find(this.fetchDatacenter, {provider})
    },

    fetchDatacenter(e) {
      const data = _.get(e, 'data.items')
      if (!_.isEmpty(data)) {
        this.options.dcs = data.map(item => ({value: item, label: item.name}))
        this.dcs = data.map(item => (item.name))
      }
    },

    updateRegions(val){
      const dc = _.head(this.options.dcs.filter(d => d.label == val))
      this.regions = _.get(dc, 'value.regions', [])
      this.data.dc_id = _.get(dc, 'value._id', _.get(this.data, 'dc_id'))
    },

    fetchProviders(){
      FectherEntity(Providers)()
        .find(this.fetchAdminer)
    }
  },

  created() {
    this.fetchProviders()
  }
}
