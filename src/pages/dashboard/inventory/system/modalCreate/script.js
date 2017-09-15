'use strict'

import Modals from 'mixins/modals'
import System from 'factories/system'
import Adminer from 'factories/adminer'
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
    afterShow () {
      this.text.title =  this.create ? 'Create new System' : `Edit ${this.model.name} system`
    },

    createLoad () {
      this.tabShow=0
      this.system = {}
      this.tab_tags.reset()
      this.tab_clients.reset()
      this.tab_check.reset()
    },

    editLoad () {
      this.$set(this, 'system', this.model)
      this.tab_check.updaterEdit(this.model.check)
      this.tab_tags.updaterEdit(this.model.tags)
      this.tab_clients.updaterEdit(this.model.clients)
    },

    setupModel () {
      this.model = _.pickBy(this.system, _.identity)
    },

    createSave () {
      this.setupModel()

      FectherEntity(System)()
        .create(this.finishJob, this.model)
    },

    editSave () {
      this.setupModel()

      FectherEntity(System)()
        .update(this.finishJob, this.model)
    },

    deleteSystem() {
      this.app.system=null
    },

    fetchData() {
      FectherEntity(Adminer)({persistence: 'local'})
        .find(this.fetchAdminer, {key: 'system_options'})
    }

  },

  created() {
    this.fetchData()
  }

}
