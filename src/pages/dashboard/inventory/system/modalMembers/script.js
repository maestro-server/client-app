'use strict'

import Modals from 'mixins/modals'
import Applications from 'factories/applications'
import Adminer from 'factories/adminer'
import formatAdminer from 'src/resources/libs/formatAdminerData'
import FectherEntity from 'services/fetchEntity'

import tabApps from './tab_apps'

export default {
  mixins: [Modals],

  components: {
    tabApps
  },

  data () {
    return {
      URL_CLIENT: `${API_URL}/clients?query=`,
      template: "<b>{{item.name}}</b>",
      apps: {},
      options: {
        check:[],
        apps: []
      }
    }
  },

  computed: {
    tab_apps() {return this.$refs.tab_apps}
  },

  methods: {
    setTabShow (index) {
      this.tabShow = index
      return this
    },

    afterShow () {
      this.text.title =  this.create ? 'Create new System' : `Edit ${this.model.name} system`

      if(!this.create) {
        this.editLoad()
      }
    },

    editLoad () {
      const {_id} = this.model

      FectherEntity(Applications)(this)({k: 'system_app_'+_id})
        .find((e) => {
          this.tab_apps.updaterEdit(_.get(e, 'data.items', []))
        }, {"system._id": _id})

    },

    setupModel () {
      this.model = _.pickBy(this.system, _.identity)
    },

    createSave () {},

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
