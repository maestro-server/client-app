'use strict'

import Modals from 'mixins/modals'
import Providers from 'factories/providers'
import Datacenters from 'factories/datacenters'
import FectherEntity from 'services/fetchEntity'

export default {
  mixins: [Modals],

  data: function() {
    return {
      provider: '',
      data: {conn:{}, provider: null},
      providers: [
        {
          name: 'AWS',
          icon: 'icon-aws',
          key: 'AWS',
          links: [
            {label: "AWS Access Key (IAM)"}
          ]
        },
        {
          name: 'OpenStack',
          key: 'OpenStack',
          icon: 'icon-openstack',
          links: [
            {label: "API (Horizon)"}
          ]
        }
      ],
      permission: {
        'AWS': [
          {name: 'Describe Instance', desc: 'List and update EC2 informations', used: 'Require to auto discovery servers'}
        ]
      },
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
      this.model.name = this.provider
    },

    createLoad () {
      this.provider = ''
      this.data = {conn: {}}
    },

    createSave () {
      this.setupModel()
      FectherEntity(Providers)()
        .create(this.finishJob, this.model)
    },

    editLoad () {
      this.$set(this, 'data', this.model)
      this.$set(this, 'provider', this.model.name)
    },

    editSave () {
      this.setupModel()
      FectherEntity(Providers)()
        .update(this.finishJob, this.model)
    },

    callStep(prv) {
      this.provider = prv.key
    },

    fetchData: function () {
      FectherEntity(Datacenters)()
        .find(this.fetchDatacenter)
    },

    fetchDatacenter(e) {
      const data = _.get(e, 'data.items')
      if (!_.isEmpty(data)) {
        this.options = data.map(item => ({value: item, label: item.name}))
        this.dcs = this.options.map(d => d.label)
      }
    },

    updateProvider(val){
      const dc = _.head(this.options.filter(d => d.label == val))
      this.regions = _.get(dc, 'value.regions', [])
    }
  },

  created() {
    this.fetchData()
  }

}
