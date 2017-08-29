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
      const k = 'system_'+this.model._id

      FectherEntity(System)(this)({k})
        .remove(this.finishJob, this.model)
    }
  }

}
