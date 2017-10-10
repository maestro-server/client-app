'use strict'

import Applications from 'factories/applications'
import Modals from 'mixins/modals'
import ModalsApps from 'mixins/modals-apps'

import tabApplications from 'src/pages/dashboard/_modules/tabs/tab_applications'

export default {
  mixins: [Modals, ModalsApps],

  components: {
    tabApplications
  },

  data () {
    return {
      family: 'CI/CD',
      initialData: {
        name: null, description: null, provider:null,
        tags: [], servers: [],
        role: {endpoint: null, extra_config: null}
      },
      mapper: [
        {name: 'endpoint', label: 'Endpoint', validate: 'url'},
        {name: 'extra_config', label: 'Extra Config', type: 'textarea', validate: 'min:2'}
      ]
    }
  },

  computed: {
    tab_targets() {
      return this.$refs.tab_targets
    },
  },

  methods: {
    hookCreateLoad() {
      this.tab_targets.reset()
    },

    hookEditLoad() {
      this.editLoadEntities('targets', Applications)
    },
  }

}
