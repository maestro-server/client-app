'use strict'

import Modals from 'mixins/modals'
import svTable from './table'

export default {
  mixins: [Modals],

  components: {
    svTable
  },

  methods: {
    afterShow() {
      this.text.title = `All servers into ${this.model.name}`
    }
  }

}
