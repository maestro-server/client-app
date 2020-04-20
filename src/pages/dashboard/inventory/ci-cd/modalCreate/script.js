'use strict'

import Modals from 'mixins/modals'
import ModalsApps from 'mixins/modals-apps'

import tabFamilyApps from 'src/pages/dashboard/_modules/tabs/tab_family_applications'

export default {
  mixins: [Modals, ModalsApps],

  components: {
    tabFamilyApps
  },

  data () {
    return {
      family: 'CI/CD',
      initialData: {
        name: null,
        description: null,
        provider: null,
        tags: [],
        role: { endpoint: null, extra_config: null }
      },
      mapper: [
        { name: 'endpoint', label: 'Endpoint', validate: 'url' },
        { name: 'extra_config', label: 'Extra Config', type: 'textarea', validate: 'min:2' }
      ]
    }
  }
}
