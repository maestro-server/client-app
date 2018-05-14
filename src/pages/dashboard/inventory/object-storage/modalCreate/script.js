'use strict'

import Modals from 'mixins/modals'
import ModalsApps from 'mixins/modals-apps'

import tabFamilyApps from 'src/pages/dashboard/_modules/tabs/tab_family_applications'
import Applications from 'factories/applications'

export default {
  mixins: [Modals, ModalsApps],

  components: {
    tabFamilyApps
  },

  data () {
    return {
      family: 'ObjectStorage',
      own: 1,
      initialData: {
        name: null, description: null, provider:null, datacenters: {},
        tags: [], servers: [], targets: [],
        role: {domain: null, endpoint: null, extra_config:null}
      },
      mapper: [
        {name: 'endpoint', label: 'Endpoint', validate: 'url'},
        {name: 'domain', label: 'Domain', validate: 'min:2'},
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
