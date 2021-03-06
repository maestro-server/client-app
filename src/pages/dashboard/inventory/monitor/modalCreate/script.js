'use strict'

import Modals from 'mixins/modals'
import ModalsApps from 'mixins/modals-apps'


export default {
  mixins: [Modals, ModalsApps],

  data () {
    return {
      family: 'Monitor',
      initialData: {
        name: null,
        description: null,
        provider: null,
        datacenters: {},
        tags: [],
        role: { healthcheck: null, endpoint: null }
      },
      mapper: [
        { name: 'endpoint', label: 'Endpoint', validate: 'url' },
        { name: 'extra_config', label: 'Extra Config', type: 'textarea', validate: 'min:2' }
      ]
    }
  }
}
