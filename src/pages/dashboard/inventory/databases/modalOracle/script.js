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
      initialData: {
        name: null, description: null, provider:null,
        tags: [], servers: [], targets: [],
        role: {healthcheck: null, endpoint: null}
      },
      options: {
        third: [],
        own: []
      }
    }
  },

  methods: {
    afterShow() {
      this.text.title = this.create ? `Create new Oracle DB` : `Edit ${this.model.name} Oracle DB`
    }
  }

}
