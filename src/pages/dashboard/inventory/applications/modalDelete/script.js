    'use strict'
import Modals from 'mixins/modals'
import Applications from 'factories/applications'
import FectherEntity from 'services/fetchEntity'

export default {
  mixins: [Modals],

  methods: {
    afterShow () {
      this.text.title = `DELETE ${this.model.name} ?`
    },

    editSave () {
      const k = 'application_'+this.model._id

      FectherEntity(Applications)(this)({k})
        .remove(this.finishJob, this.model)
    }
  }

}
