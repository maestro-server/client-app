'use strict'
// import _ from 'lodash'
import Modals from 'mixins/modals'
import Clients from 'factories/clients'
import Adminer from 'factories/adminer'
import formatAdminer from 'src/resources/libs/formatAdminerData'
import FectherEntity from 'services/fetchEntity'

import tabTags from './tab_tags'
import tabChannel from './tab_channel'

export default {
  mixins: [Modals],

  components: {
    tabTags,
    tabChannel
  },

  data () {
    return {
      URL_SYSTEM: `${API_URL}/system?query=`,
      template: "<b>{{item.name}}</b>",
      tabShow:0,
      client: {
        name: null, description: null,
        tags: [], contacts: []
      },
      options: {
        environment:[],
        role: [],
        deploy:[],
        languages: [],
        clusters: []
      }
    }
  },

  computed: {
    tab_channel() {return this.$refs.tab_channel},
    tab_tags() {return this.$refs.tab_tags}
  },

  methods: {
    setTabShow (index) {
      this.tabShow = index
      return this
    },

    afterShow () {
      this.text.title =  this.create ? 'Create new Client' : `Edit ${this.model.name} clients`

      this.create ? this.resetApp() : this.editLoad()
    },

    editLoad () {
      this.$set(this, 'client', this.model)
      this.tab_channel.updaterEdit(this.model.contacts)
      this.tab_tags.updaterEdit(this.model.tags)
    },

    resetApp() {
      this.tabShow=0
      this.client = {}
      this.tab_channel.reset()
      this.tab_tags.reset()
    },

    setupModel () {
      this.model = _.pickBy(this.client, _.identity)
    },

    createSave () {
      this.setupModel()

      new Clients(this.model)
      .authorization()
      .create(this.finishJob)
    },

    editSave () {
      this.setupModel()

      FectherEntity(Clients)(this)({k: 'client_'+this.model._id})
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

    fetchData() {
      FectherEntity(Adminer)(this)({k: 'clients_options', persistence: 'local', time: 2840})
        .find(this.fetchAdminer, {key: 'clients_options'})
    },

    fetchAdminer (e) {
      _.assign(this.options, formatAdminer(e))
    }

  },

  created() {
    this.fetchData()
  }

}
