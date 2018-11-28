'use strict'

import Modals from 'mixins/modals'
import ModalsApps from 'mixins/modals-apps'

import Adminer from 'factories/adminer'
import FectherEntity from 'services/fetchEntity'

import tabDeploy from 'src/pages/dashboard/_modules/tabs/tab_deploy'
import tabRole from 'src/pages/dashboard/_modules/tabs/tab_apps_role'


export default {
  mixins: [Modals, ModalsApps],

  components: {
    tabDeploy,
    tabRole,
  },

  data () {
    return {
      family: 'Application',
      initialData: {
        name: null, description: null,
        environment: null, system: [],
        language: null, cluster: null,
        deploy: [], tags: [], servers: [],
        role: {role: 'Application'}
      },
      options: {
        environment:[],
        role: [],
        deploy:[],
        own: [],
        clusters: []
      }
    }
  },

  computed: {
    tab_role() {return this.$refs.tab_role},
    tab_deploy() {return this.$refs.tab_deploy}
  },

  methods: {
    hookCreateLoad() {
      this.tab_role.reset()
      this.tab_deploy.reset()
    },

    hookEditLoad() {
      const role = _.get(this.data, 'role')
      const deploy = _.get(this.model, 'deploy', [])

      this.tab_role.updaterEdit(role)
      this.tab_deploy.updaterEdit(deploy)
    },

    fetchOptions() {
      const key = `application_options`

      FectherEntity(Adminer)({persistence: 'local'})
        .find(this.fetchAdminer, {key})
    }
  },

  created() {
    this.fetchOptions()
  }
}
