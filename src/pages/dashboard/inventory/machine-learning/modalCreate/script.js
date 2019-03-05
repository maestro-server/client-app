'use strict'

import Modals from 'mixins/modals'
import ModalsApps from 'mixins/modals-apps'

import Adminer from 'factories/adminer'
import FectherEntity from 'services/fetchEntity'


export default {
  mixins: [Modals, ModalsApps],

  data () {
    return {
      family: 'MachineLearning',
      own: 1,
      initialData: {
        name: null, description: null, provider:null,
        datacenters: {},
        tags: [], role: {endpoint: null}
      },
      mapper: [
        {name: 'endpoint', label: 'Endpoint', validate: 'url'},
        {name: 'models', label: 'Models', type: 'textarea', validate: 'min:2'},
        {name: 'extra_config', label: 'Extra Config', type: 'textarea', validate: 'min:2'}
      ]
    }
  },

  methods: {
    fetchIAData() {
      FectherEntity(Adminer)({persistence: 'local'})
      .find(this.fetchAdminer, {key: 'ia_options'})
    },

    hookCreateLoad() {
      this.fetchIAData()
    },

    hookEditLoad() {
      this.fetchIAData()
    }
  }

}
