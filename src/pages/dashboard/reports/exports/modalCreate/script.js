'use strict'

import Modals from 'mixins/modals'
import Reports from 'factories/reports'
import FectherEntity from 'services/fetchEntity'

import tabGeneral from './tabs/tab_general'
import tabPivot from './tabs/tab_pivot'

export default {
  mixins: [Modals],

  components: {
    tabGeneral,
    tabPivot
  },

  data () {
    return {
      data: {
        table: "Servers"
      }
    }
  },

  computed: {
    tab_general() {return this.$refs.tab_general},
    tab_pivot() {return this.$refs.tab_pivot}
  },

  methods: {
    afterShow () {
      this.text.title =  this.create ? 'Create new Report' : `Edit ${this.model.name} reports`
    },

    createLoad () {
      this.tabShow=0
      this.data = {}
    },

    editLoad () {
      this.$set(this, 'data', this.model)
    },

    setupModel () {
      this.model = _.pickBy(this.data, _.identity)
    },

    createSave () {
      this.setupModel()

      FectherEntity(Reports)()
        .create(this.finishJob, this.model)
    },

    editSave () {
      this.setupModel()

      FectherEntity(Reports)()
        .update(this.finishJob, this.model)
    },

    updaterFilters() {

    }
  }

}
