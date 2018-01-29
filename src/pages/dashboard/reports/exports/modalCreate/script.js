'use strict'

import Modals from 'mixins/modals'
import tabGeneral from './tabs/tab_general'
import tabPivot from './tabs/tab_pivot'

export default {
  mixins: [Modals],

  components: {
    tabGeneral,
    tabPivot
  },

  computed: {
    tab_general() {return this.$refs.tab_general},
    tab_pivot() {return this.$refs.tab_pivot}
  },

  methods: {
    afterShow () {
      this.text.title =  this.create ? 'Create new Report' : `Edit ${this.model.name} reports`
    },

    createSave () {
      console.log(this.model)
    }
  }

}
