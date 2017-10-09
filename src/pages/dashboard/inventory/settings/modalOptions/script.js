'use strict'

import Adminer from 'factories/adminer'
import Modals from 'mixins/modals'
import Services from 'factories/services'
import FectherEntity from 'services/fetchEntity'

import tabItems from 'src/pages/dashboard/_modules/tabs/tab_array_item'


export default {
  mixins: [Modals],

  components: {
    tabItems
  },

  computed: {
    tab_items() {return this.$refs.tab_items}
  },

  data () {
    return {
      data: {
        value: {}
      }
    }
  },

  methods: {
    afterShow () {
      this.text.title =  this.create ? 'Create new config' : `Edit ${this.model.key} config`
    },

    createLoad () {
      this.tabShow=0
      this.data = {}
      this.tab_items.reset()
    },

    editLoad () {
      this.$set(this, 'data', this.model)
    },

    setupModel () {
      this.model = _.pickBy(this.data, _.identity)
    },

    createSave () {
      this.setupModel()

      FectherEntity(Services)()
        .create(this.finishJob, this.model)
    },

    titleAcc(fields, k) {
      return `${k} (${fields.length})`
    },

    editSave () {
      this.setupModel()

      FectherEntity(Services)()
        .patch(this.finishJob, this.model)
    }
  }

}
