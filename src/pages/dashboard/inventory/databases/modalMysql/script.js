'use strict'

import Modals from 'mixins/modals'
import ModalsApps from 'mixins/modals-apps'

import tabTags from 'src/pages/dashboard/_modules/tabs/tab_tags'
import tabServers from 'src/pages/dashboard/_modules/tabs/tab_servers'
import tabRole from 'src/pages/dashboard/_modules/tabs/tab_input'
import tabSystem from 'src/pages/dashboard/_modules/tabs/tab_system'

export default {
  mixins: [Modals, ModalsApps],

  components: {
    tabTags,
    tabServers,
    tabRole,
    tabSystem
  },

  data () {
    return {
      family: 'Database',
      modal: 'mysql',
      initialData: {
        name: null, description: null, provider:null,
        tags: [], servers: [], targets: [],
        role: {healthcheck: null, endpoint: null}
      },
      options: {
        cluster: [],
        mysql: {
          third: {},
          own: {}
        }
      },
      mapper: [
        {name: 'endpoint', label: 'Endpoint', validate: 'url'},
        {name: 'version', label: 'Version', validate: 'min:2'},
        {name: 'patch', label: 'Patch', validate: 'min:2'},
        {name: 'port', label: 'Port', validate: 'alpha_num'},
        {name: 'extra_config', label: 'My.cnf', type: 'textarea', validate: 'min:2'}
      ]
    }
  },

  methods: {
    afterShow() {
      this.text.title = this.create ? `Create new MySql` : `Edit ${this.model.name} MySql`
    },

    hookCreateLoad() {
      this.$set(this.data, 'modal', this.modal)
    }
  },

  computed: {
    providers() {
      return this.own ? this.options.mysql.third : this.options.mysql.own
    }
  }
}
