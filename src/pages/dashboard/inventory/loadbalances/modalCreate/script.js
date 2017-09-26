'use strict'

import Modals from 'mixins/modals'
import Servers from 'factories/servers'
import Applications from 'factories/applications'
import Adminer from 'factories/adminer'
import FectherEntity from 'services/fetchEntity'

import tabTags from 'src/pages/dashboard/_modules/tabs/tab_tags'
import tabServers from 'src/pages/dashboard/_modules/tabs/tab_servers'
import tabDeploy from 'src/pages/dashboard/_modules/tabs/tab_deploy'
import tabRole from 'src/pages/dashboard/_modules/tabs/tab_role'
import tabSystem from 'src/pages/dashboard/_modules/tabs/tab_system'

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
      own: 0,
      app: {
        family: 'Loadbalance',
        name: null, description: null, provider:null,
        tags: [], servers: [], targets: []
      },
      options: {
        third: [],
        own: []
      },
      outher: false,
    }
  },

  computed: {
    tab_servers() {return this.$refs.tab_servers},
    tab_system() {return this.$refs.tab_system},
    tab_tags() {return this.$refs.tab_tags},
    providers() {
      return this.own ? this.options.third : this.options.own
    },
    labelBtnChangeProvider() {
      return this.outher ? 'Back to selection provider' : '<i class="fa fa-plus"></i> Provider'
    },
    changeType() {
      return this.outher ? 'btn-warning' : 'btn-primary'
    }
  },

  methods: {
    afterShow () {
      this.text.title =  this.create ? 'Create new Applications' : `Edit ${this.model.name} applications`
    },

    createLoad () {
      this.tabShow=0
      this.app = {}
      this.tab_servers.reset()
      this.tab_tags.reset()
      this.tab_system.reset()
    },

    editLoad () {
      if (!_.isEmpty(this.model.servers)) {
        FectherEntity(Servers)()
          .find((e) => {
            this.tab_servers.updaterEdit(_.get(e, 'data.items', []))
          }, {_id: this.model.servers})
      }

      this.$set(this, 'app', this.model)
      this.tab_tags.updaterEdit(this.model.tags)
      this.tab_system.updaterEdit(this.model.system)
    },

    setupModel () {
      this.model = _.pickBy(this.app, _.identity)
    },

    createSave () {
      this.setupModel()

      FectherEntity(Applications)()
        .create(this.finishJob, this.model)
    },

    editSave () {
      this.setupModel()

      FectherEntity(Applications)()
        .update(this.finishJob, this.model)
    },

    fetchData() {
      FectherEntity(Adminer)({persistence: 'local'})
        .find(this.fetchAdminer, {key: 'lb_options'})
    },

    changeProvider() {
      this.outher = !this.outher
    },

  },

  created() {
    this.fetchData()
  }

}
