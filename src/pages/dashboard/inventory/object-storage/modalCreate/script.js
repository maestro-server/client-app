'use strict'

import Modals from 'mixins/modals'
import ModalsApps from 'mixins/modals-apps'

export default {
  mixins: [Modals, ModalsApps],

  data () {
    return {
      family: 'ObjectStorage',
      own: 1,
      initialData: {
        name: null,
        description: null,
        provider: null,
        datacenters: {},
        tags: [],
        role: { domain: null, endpoint: null, extra_config: null }
      },
      mapper: [
        { name: 'endpoint', label: 'Endpoint', validate: 'url' },
        { name: 'domain', label: 'Domain', validate: 'min:2' },
        { name: 'extra_config', label: 'Extra Config', type: 'textarea', validate: 'min:2' }
      ]
    }
  }
}
