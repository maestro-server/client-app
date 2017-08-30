'use strict'
import Modals from 'mixins/modals'
import Teams from 'factories/teams'
import FectherEntity from 'services/fetchEntity'

export default {
  mixins: [Modals],

  methods: {
    afterShow () {
      this.text.title = `DELETE ${this.model.name} ?`
    },

    editSave () {
      const k = 'teams_'+this.model._id

      FectherEntity(Teams)(this)({k})
        .remove(this.finishJob, this.model)
    }
  }

}
