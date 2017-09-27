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
      family: 'Serverless',
      own: 1,
      initialData: {
        name: null, description: null, provider:null,
        tags: [], servers: [], targets: [],
        role: {language: null}
      }
    }
  },

  computed: {
    tab_servers() {return this.$refs.tab_servers},
    tab_system() {return this.$refs.tab_system},
    tab_role() {return this.$refs.tab_role},
    tab_tags() {return this.$refs.tab_tags}
  },

  methods: {
    createLoad () {
      this.tabShow=0
      this.resetData()
      this.tab_role.reset()
      this.tab_servers.reset()
      this.tab_tags.reset()
      this.tab_system.reset()
    },

    editLoad () {
      this.editLoadServers('servers')

      this.$set(this, 'data', this.model)
      this.tab_role.updaterEdit(this.model.role)
      this.tab_tags.updaterEdit(this.model.tags)
      this.tab_system.updaterEdit(this.model.system)
    }
  }

}
