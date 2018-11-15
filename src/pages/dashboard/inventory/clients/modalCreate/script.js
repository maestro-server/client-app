'use strict'

import Modals from 'mixins/modals'
import Clients from 'factories/clients'
import Adminer from 'factories/adminer'
import FectherEntity from 'services/fetchEntity'
import verifyDuplicate from 'mixins/verify_duplicate'

import tabTags from 'src/pages/dashboard/_modules/tabs/tab_tags'
import tabChannel from 'src/pages/dashboard/_modules/tabs/tab_channel'
import api_url from 'src/resources/libs/api_url'

export default {
  mixins: [Modals, verifyDuplicate],

  components: {
    tabTags,
    tabChannel
  },

  data () {
    return {
      URL_SYSTEM: `${api_url}/system?query=`,
      template: "<b>{{item.name}}</b>",
      data: {
        name: null, description: null,
        tags: [], contacts: []
      },
      options: {
        environment:[],
        role: [],
        deploy:[],
        languages: [],
        clusters: []
      },
      entity: Clients
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
      this.data = {}
      this.clearDuplicate()
      this.tab_channel.reset()
      this.tab_tags.reset()
    },

    editLoad () {
      this.$set(this, 'data', this.model)
      this.tab_channel.updaterEdit(_.get(this.model, 'contacts', []))
      this.tab_tags.updaterEdit(_.get(this.model, 'tags', []))
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
        .find(this.fetchAdminer, {key: 'clients_options'})
    }
  },

  created() {
    this.fetchData()
  }

}
