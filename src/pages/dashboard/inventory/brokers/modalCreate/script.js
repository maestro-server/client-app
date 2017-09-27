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
      family: 'Broker',
      initialData: {
        name: null, description: null, provider:null,
        tags: [], servers: [], targets: [],
        role: {endpoint_zookeeper: null, endpoint: null, extra_config: null}
      },
      mapper: [
        {name: 'endpoint', label: 'Endpoint', validate: 'url'},
        {name: 'endpoint_zookeeper', label: 'Zookeeper Endpoint', validate: 'min:2'},
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
