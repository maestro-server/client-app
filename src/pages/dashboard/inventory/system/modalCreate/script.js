'use strict'

import Modals from 'mixins/modals'
import System from 'factories/system'
import Adminer from 'factories/adminer'
import formatAdminer from 'src/resources/libs/formatAdminerData'
import FectherEntity from 'services/fetchEntity'

import tabTags from './tab_tags'
import tabCheck from './tab_check'
import tabClients from './tab_clients'

export default {
  mixins: [Modals],

  components: {
    tabTags,
    tabCheck,
    tabClients
  },

  data () {
    return {
      URL_CLIENT: `${API_URL}/clients?query=`,
      template: "<b>{{item.name}}</b>",
      tabShow:0,
      system: {name: null, description: null, links: [], applications:null, tags: [], check: [], clients: []},
      options: {
        check:[],
        apps: []
      }
    }
  },

  computed: {
    tab_check() {return this.$refs.tab_check},
    tab_clients() {return this.$refs.tab_clients},
    tab_tags() {return this.$refs.tab_tags}
  },

  methods: {
    setTabShow (index) {
      this.tabShow = index
      return this
    },

    afterShow () {
      this.text.title =  this.create ? 'Create new System' : `Edit ${this.model.name} system`

      this.create ? this.resetApp() : this.editLoad()
    },

    editLoad () {
      this.$set(this, 'system', this.model)
      this.tab_check.updaterEdit(this.model.check)
      this.tab_tags.updaterEdit(this.model.tags)
      this.tab_clients.updaterEdit(this.model.clients)
    },

    resetApp() {
      this.tabShow=0
      this.system = {}
      this.tab_tags.reset()
      this.tab_clients.reset()
      this.tab_check.reset()
    },

    setupModel () {
      this.model = _.pickBy(this.system, _.identity)
    },

    createSave () {
      this.setupModel()

      new System(this.model)
        .authorization()
        .create(this.finishJob)
    },

    editSave () {
      this.setupModel()

      FectherEntity(System)(this)({k: 'system_'+this.model._id})
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

    deleteSystem() {
      this.app.system=null
    },


    fetchData() {
      FectherEntity(Adminer)(this)({k: 'system_options', persistence: 'local', time: 2840})
        .find(this.fetchAdminer, {key: 'system_options'})
    },


    fetchAdminer (e) {
      _.assign(this.options, formatAdminer(e))
    }

  },

  created() {
    this.fetchData()
  }

}
