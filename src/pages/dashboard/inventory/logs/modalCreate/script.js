'use strict'

import Modals from 'mixins/modals'
import ModalsApps from 'mixins/modals-apps'


export default {
  mixins: [Modals, ModalsApps],

  data () {
    return {
      family: 'Logs',
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
        { name: 'healthcheck', label: 'Healthcheck', validate: 'min:2' }
      ]
    }
  }
}
