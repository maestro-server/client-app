'use strict'

import Modals from 'mixins/modals'
import ModalsApps from 'mixins/modals-apps'

import Adminer from 'factories/adminer'
import FectherEntity from 'services/fetchEntity'
import tabEndpoint from 'src/pages/dashboard/_modules/tabs/tab_endpoint'

export default {
  mixins: [Modals, ModalsApps],

  components: {
    tabEndpoint
  },

  data () {
    return {
      family: 'Loadbalance',
      initialData: {
        name: null,
        description: null,
        providers: null,
        datacenters: {},
        tags: [],
        role: { healthcheck: null, endpoint: null }
      },
      mapper: [
        { name: 'endpoint', label: 'Endpoint', validate: 'url' },
        { name: 'healthcheck', label: 'Healthcheck', validate: 'min:2' }
      ]
    }
  },

  computed: {
    tab_endpoint () { return this.$refs.tab_endpoint }
  },

  methods: {
    fetchProtocolData () {
      FectherEntity(Adminer)({ persistence: 'local' })
        .find(this.fetchAdminer, { key: 'deps_options' })
    },

    hookCreateLoad () {
      this.tab_endpoint.reset()
      this.fetchProtocolData()
    },

    hookEditLoad () {
      this.tab_endpoint.updaterEdit(this.data.deps)
      this.fetchProtocolData()
    }
  }
}
