'use strict'
import _ from 'lodash'
import Servers from 'factories/servers'
import Applications from 'factories/applications'
import Adminer from 'factories/adminer'
import FectherEntity from 'services/fetchEntity'

import tabTags from 'src/pages/dashboard/_modules/tabs/tab_tags'
import tabServers from 'src/pages/dashboard/_modules/tabs/tab_servers'
import tabSystem from 'src/pages/dashboard/_modules/tabs/tab_system'
import tabRole from 'src/pages/dashboard/_modules/tabs/tab_input'

export default {

  components: {
    tabTags,
    tabServers,
    tabSystem,
    tabRole
  },

  data () {
    return {
      own: 0,
      data: {},
      options: {
        third: [],
        own: []
      },
      other: false,
    }
  },

  computed: {
    tab_servers() {return this.$refs.tab_servers},
    tab_targets() {return this.$refs.tab_targets},
    tab_system() {return this.$refs.tab_system},
    tab_tags() {return this.$refs.tab_tags},
    tab_role() {return this.$refs.tab_role},
    providers() {
      return this.own ? this.options.third : this.options.own
    },
    labelPService() {
      return this.own ? 'Provider' : 'Service'
    },
    labelBtnChangeProvider() {
      return this.other ? 'Back to selection '+this.labelPService : '<i class="fa fa-plus"></i> '+this.labelPService
    },
    changeType() {
      return this.other ? 'btn-warning' : 'btn-primary'
    }
  },

  methods: {
    hookCreateLoad() {},
    hookEditLoad() {},
    afterShow () {
      this.text.title =  this.create ? `Create new ${this.family}s` : `Edit ${this.model.name} ${this.family.toLowerCase()}s`
    },

    createLoad () {
      this.tabShow=0
      this.resetData()
      this.tab_role.reset()
      this.tab_servers.reset()
      this.tab_tags.reset()
      this.tab_system.reset()

      this.hookCreateLoad()
    },

    editLoad () {
      this.editLoadEntities('servers')
      this.editSwapVars('own')

      this.$set(this, 'data', this.model)
      this.tab_role.updaterEdit(this.model.role)
      this.tab_tags.updaterEdit(this.model.tags)
      this.tab_system.updaterEdit(this.model.system)

      this.hookEditLoad()
    },

    editLoadEntities(fielder, entitier = Servers) {
      if (!_.isEmpty(this.model[fielder])) {
        FectherEntity(entitier)()
          .find((e) => {
            this[`tab_${fielder}`].updaterEdit(_.get(e, 'data.items', []))
          }, {_id: this.model[fielder]})
      }
    },

    editSwapVars(fielder) {
      this.$set(this, fielder, _.get(this.model, fielder))
    },

    setupModel () {

      this.model = _(this.data)
        .set('role', _.pickBy(this.data.role, _.identity))
        .set('family', this.family)
        .set('own', this.own)
        .pickBy(_.identity)
        .value()
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
      const key = `${this.family.toLowerCase()}_options`

      FectherEntity(Adminer)({persistence: 'local'})
        .find(this.fetchAdminer, {key})
    },

    changeProvider() {
      this.other = !this.other
    }
  },

  created() {
    this.fetchData()
  }
}
