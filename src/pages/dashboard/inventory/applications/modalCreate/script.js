'use strict'
// import _ from 'lodash'
import Modals from 'mixins/modals'
import Servers from 'factories/servers'
import Applications from 'factories/applications'
import Adminer from 'factories/adminer'
import formatAdminer from 'src/resources/libs/formatAdminerData'
import FectherEntity from 'services/fetchEntity'

import tabTags from './tab_tags'
import tabServers from './tab_servers'
import tabDeploy from './tab_deploy'
import tabRole from './tab_role'
import tabSystem from './tab_system'

export default {
  mixins: [Modals],

  components: {
    tabTags,
    tabServers,
    tabDeploy,
    tabRole,
    tabSystem
  },

  data () {
    return {
      tabShow:0,
      app: {
        name: null, description: null,
        environment: null, system: [],
        language: null, cluster: null,
        deploy: [], tags: [], servers: [], role: {}
      },
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
    setTabShow (index) {
      this.tabShow = index
      return this
    },

    afterShow () {
      this.text.title =  this.create ? 'Create new Applications' : `Edit ${this.model.name} applications`

      this.create ? this.resetApp() : this.editLoad()
    },

    editLoad () {
      const {_id} = this.model

      if (!_.isEmpty(this.model.servers)) {
        FectherEntity(Servers)({k: 'app_server_'+_id})
          .find((e) => {
            this.tab_servers.updaterEdit(_.get(e, 'data.items', []))
          }, {_id: this.model.servers})
      }

      this.$set(this, 'app', this.model)
      this.tab_role.updaterEdit(this.app.role)
      this.tab_deploy.updaterEdit(this.model.deploy)
      this.tab_tags.updaterEdit(this.model.tags)
      this.tab_system.updaterEdit(this.model.system)
    },

    resetApp() {
      this.tabShow=0
      this.app = {}
      this.tab_role.reset()
      this.tab_servers.reset()
      this.tab_deploy.reset()
      this.tab_tags.reset()
      this.tab_system.reset()
    },

    setupModel () {
      this.model = _.pickBy(this.app, _.identity)
    },

    createSave () {
      this.setupModel()

      new Applications(this.model)
      .authorization()
      .create(this.finishJob)
    },

    editSave () {
      this.setupModel()

      FectherEntity(Applications)({k: 'application_'+this.model._id})
        .update(this.finishJob, this.model)
    },

    setTeam(item) {
      this.$set(this.model, 'team', item)
      return this
    },

    teamSelected(item) {
      this.setTeam(item)
      this.model.input = ""
    },

    fetchData() {
      FectherEntity(Adminer)({k: 'app_options', persistence: 'local', time: 2840})
        .find(this.fetchAdminer, {key: 'app_options'})
    },

    fetchAdminer (e) {
      _.assign(this.options, formatAdminer(e))
    }

  },

  created() {
    this.fetchData()
  }

}
