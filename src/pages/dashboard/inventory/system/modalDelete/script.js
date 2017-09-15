 'use strict'
import Modals from 'mixins/modals'
import System from 'factories/system'
import FectherEntity from 'services/fetchEntity'

export default {
  mixins: [Modals],

  methods: {
    afterShow () {
      this.text.title = `DELETE ${this.model.name} ?`
    },

    editSave () {
      FectherEntity(System)(this)()
        .remove(this.finishJob, this.model)
    }
  }

}
