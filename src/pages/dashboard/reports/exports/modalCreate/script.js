'use strict'

import FectherEntity from 'services/fetchEntity'
import Modals from 'mixins/modals'
import tabGeneral from './tabs/tab_general'
import tabPivot from './tabs/tab_pivot'
import Reports from 'factories/reports'

import _ from 'lodash'

export default {
  mixins: [Modals],

  components: {
    tabGeneral,
    tabPivot
  },

  data: function() {
    return {
      data: {},
      tabShow: 0
    }
  },

  computed: {
    tab_general() {return this.$refs.tab_general},
    tab_pivot() {return this.$refs.tab_pivot}
  },

  methods: {
    afterShow () {
      this.text.title =  this.create ? 'Create new Report' : `Edit ${this.model.name} reports`
      this.changeTab(this.tabShow)
    },

    editLoad () {
      this.tabShow=0
      this.$set(this, 'data', this.model)

      this.tab_tags.updaterEdit(_.get(this.model, 'args', []))
      this.tab_chains.updaterEdit(_.get(this.model, 'chain', []))
      this.$nextTick()
    },


    setupModel () {
      this.model.name = `${_.get(this, 'model.report', '-')} ${_.get(this, 'model.component', '-')} ${new Date().toLocaleString("en-US")}`
      this.model.status = 'process'
    },

    changeTab(tab) {
      switch(tab) {
        case 0:
          this.tab_general.updateEvent()
        break;
        case 1:
          this.tab_pivot.updateEvent()
        break;
      }
    },

    createSave () {
      this.setupModel()

      FectherEntity(Reports)()
        .create(this.finishJob, this.model)
    }
  }
}
