'use strict'

import Modals from 'mixins/modals'
import Applications from 'factories/applications'

import Adminer from 'factories/adminer'
import FectherEntity from 'services/fetchEntity'

import tabEndpoint from 'src/pages/dashboard/_modules/tabs/tab_endpoint'

export default {
  mixins: [Modals],

  components: {
    tabEndpoint
  },

  data () {
    return {
      data: {deps: []},
      options: {
        protocol:[]
      },
      entity: Applications
    }
  },

  computed: {
    tab_endpoint() {return this.$refs.tab_endpoint}
  },

  methods: {
    afterShow () {
      this.text.title =  this.create ? 'Create new dependencies' : `Edit ${this.model.name} dependencies`
    },

    editLoad () {
      this.$set(this, 'data', this.model)
      this.tab_endpoint.updaterEdit(_.get(this.model, 'deps', []))
    },

    setupModel () {
      this.model = _.pickBy(this.data, _.identity)
    },

    editSave () {
      this.setupModel()

      FectherEntity(this.entity)()
        .update(this.finishJob, this.model)
    },

    fetchData() {
      FectherEntity(Adminer)({persistence: 'local'})
        .find(this.fetchAdminer, {key: 'deps_options'})
    }

  },

  created() {
    this.fetchData()
  }

}
