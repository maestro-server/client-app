'use strict'

import Applications from 'factories/applications'
import Modals from 'mixins/modals'
import ModalsApps from 'mixins/modals-apps'

import tabTags from 'src/pages/dashboard/_modules/tabs/tab_tags'
import tabApplications from 'src/pages/dashboard/_modules/tabs/tab_applications'
import tabServers from 'src/pages/dashboard/_modules/tabs/tab_servers'
import tabRole from 'src/pages/dashboard/_modules/tabs/tab_input'
import tabSystem from 'src/pages/dashboard/_modules/tabs/tab_system'

export default {
  mixins: [Modals, ModalsApps],

  components: {
    tabTags,
    tabServers,
    tabApplications,
    tabRole,
    tabSystem
  },

  data () {
    return {
      family: 'Broker',
      own: 0,
      initialData: {
        name: null, description: null, provider:null,
        tags: [], servers: [], targets: [],
        role: {endpoint_zookeeper: null, endpoint: null, extra_config: null}
      },
      data: {},
      options: {
        third: [],
        own: []
      },
      outher: false,
      mapper: [
        {name: 'endpoint', label: 'Endpoint', validate: 'url'},
        {name: 'endpoint_zookeeper', label: 'Zookeeper Endpoint', validate: 'min:2'},
        {name: 'extra_config', label: 'Extra Config', type: 'textarea', validate: 'min:2'}
      ]
    }
  },

  computed: {
    tab_servers() {return this.$refs.tab_servers},
    tab_targets() {return this.$refs.tab_targets},
    tab_system() {return this.$refs.tab_system},
    tab_role() {return this.$refs.tab_role},
    tab_tags() {return this.$refs.tab_tags},
    providers() {
      return this.own ? this.options.third : this.options.own
    },
    labelPService() {
      return this.own ? 'Provider' : 'Service'
    },
    labelBtnChangeProvider() {
      return this.outher ? 'Back to selection '+this.labelPService : '<i class="fa fa-plus"></i> '+this.labelPService
    },
    changeType() {
      return this.outher ? 'btn-warning' : 'btn-primary'
    }
  },

  methods: {
    createLoad () {
      this.tabShow=0
      this.resetData()
      this.tab_role.reset()
      this.tab_servers.reset()
      this.tab_targets.reset()
      this.tab_tags.reset()
      this.tab_system.reset()
    },

    editLoad () {
      this.editLoadServers('servers')
      this.editLoadServers('targets', Applications)

      this.$set(this, 'data', this.model)
      this.tab_role.updaterEdit(this.model.role)
      this.tab_tags.updaterEdit(this.model.tags)
      this.tab_system.updaterEdit(this.model.system)
    },

    changeProvider() {
      this.outher = !this.outher
    }
  }

}
