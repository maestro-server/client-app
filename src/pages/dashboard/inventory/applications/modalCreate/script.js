'use strict'
// import _ from 'lodash'
import Modals from 'mixins/modals'
import Servers from 'factories/servers'
import Applications from 'factories/applications'
import System from 'factories/system'
import Adminer from 'factories/adminer'
import formatAdminer from 'src/resources/libs/formatAdminerData'
import FectherEntity from 'services/fetchEntity'

import tabTags from './tab_tags'
import tabServers from './tab_servers'
import tabDeploy from './tab_deploy'
import tabSpec from './tab_spec'

export default {
  mixins: [Modals],

  components: {
    tabTags,
    tabServers,
    tabDeploy,
    tabSpec
  },

  data () {
    return {
      tabShow:0,
      app: {name: null, description: null, environment: null, system:null, language: null, cluster: null, deploy: [], tags: [], servers: [], spec: {}},
      options: {
        environment:[],
        role: [],
        deploy:[],
        system: [],
        languages: [],
        clusters: []
      }
    }
  },

  computed: {
    tab_spec() {return this.$refs.tab_spec},
    tab_servers() {return this.$refs.tab_servers},
    tab_deploy() {return this.$refs.tab_deploy},
    tab_tags() {return this.$refs.tab_tags}
  },

  methods: {
    afterShow () {
      this.text.title =  this.create ? 'Create new Applications' : `Edit ${this.model.name} applications`

      this.create ? this.resetApp() : this.editLoad()
    },

    editLoad () {
      const {_id} = this.model

      if (!_.isEmpty(this.model.servers)) {
        FectherEntity(Servers)(this)({k: 'app_server_'+_id})
          .find((e) => {
            this.tab_servers.updaterEdit(_.get(e, 'data.items', []))
          }, {_id: this.model.servers})
      }

      this.$set(this, 'app', this.model)
      this.tab_spec.updaterEdit(this.app.spec)
      this.tab_deploy.updaterEdit(this.model.deploy)
      this.tab_tags.updaterEdit(this.model.tags)
    },

    resetApp() {
      this.tabShow=0
      this.app = {}
      this.tab_spec.reset()
      this.tab_servers.reset()
      this.tab_deploy.reset()
      this.tab_tags.reset()
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

      new Applications(this.model)
      .authorization()
      .patchID(this.model._id, this.finishJob)
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
      FectherEntity(Adminer)(this)({k: 'app_options', persistence: 'local'})
        .find(this.fetchAdminer, {key: 'app_options'})

      FectherEntity(System)(this)({k: 'system'})
        .find(this.fetchSystem)
    },

    fetchSystem (e) {
      const data = _.get(e, 'data.items')
      if(!_.isEmpty(data)) {
        this.options.system = data.map(item=>({value: item, label: item.name}))
      }
    },


    fetchAdminer (e) {
      _.assign(this.options, formatAdminer(e))
    }

  },

  created() {
    this.fetchData()
  }

}