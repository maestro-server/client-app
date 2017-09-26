'use strict'

import Modals from 'mixins/modals'
import ModalsApps from 'mixins/modals-apps'

import tabTags from 'src/pages/dashboard/_modules/tabs/tab_tags'
import tabServers from 'src/pages/dashboard/_modules/tabs/tab_servers'
import tabDeploy from 'src/pages/dashboard/_modules/tabs/tab_deploy'
import tabRole from 'src/pages/dashboard/_modules/tabs/tab_role'
import tabSystem from 'src/pages/dashboard/_modules/tabs/tab_system'

export default {
  mixins: [Modals, ModalsApps],

  components: {
    tabTags,
    tabServers,
    tabDeploy,
    tabRole,
    tabSystem
  },

  data () {
    return {
      family: 'Application',
      initialData: {
        name: null, description: null,
        environment: null, system: [],
        language: null, cluster: null,
        deploy: [], tags: [], servers: [], role: {}
      },
      data: {},
      options: {
        environment:[],
        role: [],
        deploy:[],
        languages: [],
        clusters: []
      }
    }
  },

  computed: {
    tab_role() {return this.$refs.tab_role},
    tab_servers() {return this.$refs.tab_servers},
    tab_deploy() {return this.$refs.tab_deploy},
    tab_system() {return this.$refs.tab_system},
    tab_tags() {return this.$refs.tab_tags}
  },

  methods: {
    createLoad () {
      this.tabShow=0
      this.resetData()
      this.tab_role.reset()
      this.tab_servers.reset()
      this.tab_deploy.reset()
      this.tab_tags.reset()
      this.tab_system.reset()
    },

    editLoad () {
      this.editLoadServers('servers')

      this.$set(this, 'data', this.model)
      this.tab_role.updaterEdit(this.data.role)
      this.tab_deploy.updaterEdit(this.model.deploy)
      this.tab_tags.updaterEdit(this.model.tags)
      this.tab_system.updaterEdit(this.model.system)
    }
  }

}
