'use strict'
// import _ from 'lodash'
import Modals from 'mixins/modals'
import Applications from 'factories/applications'
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
      app: {name: null, description: null, environment: null, tags: [], role: "App", servers: [], spec: {}},
      spec: {link: null, id: null, description: null},
      options: {
        environment:[],
        role: [],
        deploy:[]
      }
    }
  },

  computed: {
    tab_tags() {
      return this.$refs.tab_tags
    }
  },

  methods: {
    afterShow () {
      this.text.title =  this.create ? 'Create new Applications' : `Edit ${this.model.name} applications`
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
    },

    fetchAdminer (e) {
      this.options = formatAdminer(e)
    }

  },

  created() {
    this.fetchData()
  }

}
