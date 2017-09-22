'use strict'

import Modals from 'mixins/modals'
import AccessManager from 'factories/accessManager'
import FectherEntity from 'services/fetchEntity'

export default {
  mixins: [Modals],

  methods: {
    afterShow () {
      this.text.title =  this.create ? 'Configure new key' : `Edit ${this.model.name} key`
    },

    createSave () {
      FectherEntity(AccessManager)()
        .create(this.finishJob, this.model)
    },

    editSave () {
      FectherEntity(AccessManager)()
        .update(this.finishJob, this.model)
    }

  }

}
