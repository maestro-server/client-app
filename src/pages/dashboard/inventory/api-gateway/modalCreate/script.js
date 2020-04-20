'use strict'

import Modals from 'mixins/modals'
import Adminer from 'factories/adminer'
import ModalsApps from 'mixins/modals-apps'
import FectherEntity from 'services/fetchEntity'
import tabFamilyApps from 'src/pages/dashboard/_modules/tabs/tab_family_applications'

export default {
  mixins: [Modals, ModalsApps],

  components: {
    tabFamilyApps
  },

  data () {
    return {
      family: 'ApiGateway',
      own: 1,
      initialData: {
        name: null,
        description: null,
        provider: null,
        datacenters: {},
        tags: [],
        deps: [],
        role: { healthcheck: null, endpoint: null }
      },
      mapper: [
        { name: 'endpoint', label: 'Endpoint', validate: 'url' },
        { name: 'extra_config', label: 'Extra Config', type: 'textarea', validate: 'min:2' }
      ]
    }
  },

  computed: {
    tab_targets () {
      return this.$refs.tab_targets
    }
  },

  methods: {
    fetchProtocolData () {
      FectherEntity(Adminer)({ persistence: 'local' })
        .find(this.fetchAdminer, { key: 'deps_options' })
    },

    hookCreateLoad () {
      this.tab_targets.reset()
      this.fetchProtocolData()
    },

    hookEditLoad () {
      this.tab_targets.updaterEdit(this.data.deps)
      this.fetchProtocolData()
    }
  }
}
