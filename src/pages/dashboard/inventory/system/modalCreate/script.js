'use strict'
// import _ from 'lodash'
import Modals from 'mixins/modals'
import System from 'factories/system'
import Applications from 'factories/applications'
import Adminer from 'factories/adminer'
import formatAdminer from 'src/resources/libs/formatAdminerData'
import FectherEntity from 'services/fetchEntity'

import tabTags from './tab_tags'
import tabApps from './tab_apps'
import tabCheck from './tab_check'

export default {
  mixins: [Modals],

  components: {
    tabTags,
    tabApps,
    tabCheck
  },

  data () {
    return {
      tabShow:0,
      system: {name: null, description: null, links: [], applications:null, tags: [], check: []},
      options: {
        check:[],
        apps: []
      }
    }
  },

  computed: {
    tab_apps() {return this.$refs.tab_apps},
    tab_tags() {return this.$refs.tab_tags},
    tab_check() {return this.$refs.tab_check}
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
      const {_id} = this.model

      if (!_.isEmpty(this.model.servers)) {
        FectherEntity(Applications)(this)({k: 'system_server_'+_id})
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
      this.system = {}
      this.tab_apps.reset()
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

    deleteSystem() {
      this.app.system=null
    },

    fetchData() {
      FectherEntity(Adminer)(this)({k: 'system_options', persistence: 'local'})
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
