'use strict'

import Modals from 'mixins/modals'
import System from 'factories/system'

import Adminer from 'factories/adminer'
import FectherEntity from 'services/fetchEntity'
import verifyDuplicate from 'mixins/verify_duplicate'

import tabTags from 'src/pages/dashboard/_modules/tabs/tab_tags'
import tabCheck from 'src/pages/dashboard/_modules/tabs/tab_check'
import tabClients from 'src/pages/dashboard/_modules/tabs/tab_clients'

export default {
  mixins: [Modals, verifyDuplicate],

  components: {
    tabTags,
    tabCheck,
    tabClients
  },

  data () {
    return {
      data: {name: null, description: null, links: [], applications:null, tags: [], check: [], clients: []},
      options: {
        check:[],
        apps: []
      },
      entity: System
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
      this.data = {}
      this.clearDuplicate()
      this.tab_tags.reset()
      this.tab_clients.reset()
      this.tab_check.reset()
    },

    editLoad () {
      this.$set(this, 'data', this.model)
      this.tab_check.updaterEdit(this.model.check)
      this.tab_tags.updaterEdit(this.model.tags)
      this.tab_clients.updaterEdit(this.model.clients)
    },

    setupModel () {
      this.model = _.pickBy(this.data, _.identity)
    },

    createSave () {
      this.setupModel()

      FectherEntity(this.entity)()
        .create(this.finishJob, this.model)
    },

    editSave () {
      this.setupModel()

      FectherEntity(this.entity)()
        .update(this.finishJob, this.model)
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
