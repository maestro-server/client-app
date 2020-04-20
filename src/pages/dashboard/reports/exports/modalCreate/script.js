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

  data: function () {
    return {
      data: {},
      tabShow: 0
    }
  },

  computed: {
    tab_general () { return this.$refs.tab_general },
    tab_pivot () { return this.$refs.tab_pivot }
  },

  methods: {
    afterShow () {
      this.text.title = this.create ? 'Create new Report' : `Edit ${this.model.name} reports`
      this.changeTab(this.tabShow)
    },

    createLoad () {
      this.tabShow = 0
      this.data = {}

      this.tab_general.reset()
      this.tab_pivot.reset()
    },

    editLoad () {
      const { report, filters, component } = this.model
      this.$set(this, 'data', this.model)

      if (report === 'pivot') {

        this.tabShow = 1;
        this.tab_pivot.updaterEdit({ report, filters })
      } else {

        this.tabShow = 0;
        this.tab_general.updaterEdit({ report, filters, component })
      }

      this.$nextTick()
    },


    setupModel () {
      this.model = _.pickBy(this.data, _.identity)
      this.model.status = 'process'
      this.nameTitle()
    },

    nameTitle () {
      if (_.isEmpty(this.model.name)) { this.model.name = `${_.get(this, 'model.report', '-')} ${_.get(this, 'model.component', '-')} ${new Date().toLocaleString("en-US")}` }
    },

    changeTab (tab) {
      switch (tab) {
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
    },

    editSave () {
      this.setupModel()

      FectherEntity(Reports)()
        .update(this.finishJob, this.model)
    },

    updateData (val) {
      const nval = _.merge(this.data, val)
      this.$set(this, 'data', nval)
    }
  }
}
