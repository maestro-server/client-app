'use strict'
// import _ from 'lodash'
import Modals from 'mixins/modals'
import Servers from 'factories/servers'
import Adminer from 'factories/adminer'
import formatAdminer from 'src/resources/libs/formatAdminerData'
import FectherEntity from 'services/fetchEntity'

import tabTags from './tab_tags'
import tabServers from './tab_servers'
import tabDeploy from './tab_deploy'

export default {
  mixins: [Modals],

  components: {
    tabTags,
    tabServers,
    tabDeploy
  },

  data () {
    return {
      tabShow:0,
      app: {name: null, description: null, environment: null, tags: [], role: "App", servers: [], spec: {}},
      spec: {link: null, id: null, description: null},
      options: {
        environment:[],
        role: [],
        tags:[]
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

    createSave () {
      new Servers(this.model)
      .authorization()
      .create(this.finishJob)
    },

    editSave () {
      new Servers(this.model)
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
      FectherEntity(Adminer)(this)({k: 'server_options', persistence: 'local'})
        .find(this.fetchAdminer, {key: 'server_options'})
    },

    fetchAdminer (e) {
      this.options = formatAdminer(e)
    }

  },

  created() {
    this.fetchData()
  }

}
