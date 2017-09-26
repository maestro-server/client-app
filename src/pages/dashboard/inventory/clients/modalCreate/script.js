'use strict'

import Modals from 'mixins/modals'
import Clients from 'factories/clients'
import Adminer from 'factories/adminer'
import FectherEntity from 'services/fetchEntity'

import tabTags from 'src/pages/dashboard/_modules/tabs/tab_tags'
import tabChannel from 'src/pages/dashboard/_modules/tabs/tab_channel'

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
    afterShow () {
      this.text.title =  this.create ? 'Create new Client' : `Edit ${this.model.name} clients`
    },

    createLoad () {
      this.tabShow=0
      this.client = {}
      this.tab_channel.reset()
      this.tab_tags.reset()
    },

    editLoad () {
      this.$set(this, 'client', this.model)
      this.tab_channel.updaterEdit(this.model.contacts)
      this.tab_tags.updaterEdit(this.model.tags)
    },

    setupModel () {
      this.model = _.pickBy(this.client, _.identity)
    },

    createSave () {
      this.setupModel()

      FectherEntity(Clients)()
        .create(this.finishJob, this.model)
    },

    editSave () {
      this.setupModel()

      FectherEntity(Clients)()
        .update(this.finishJob, this.model)
    },

    fetchData() {
      FectherEntity(Adminer)({persistence: 'local'})
        .find(this.fetchAdminer, {key: 'clients_options'})
    }
  },

  created() {
    this.fetchData()
  }

}
