'use strict'

import Modals from 'mixins/modals'
import Reports from 'factories/reports'
import FectherEntity from 'services/fetchEntity'

export default {
  mixins: [Modals],

  methods: {
    afterShow () {
      this.text.title =  this.create ? 'Create new Graph' : `Edit ${this.model.name} graph`
    },

    createSave () {
      FectherEntity(Reports)()
        .create(this.finishJob, this.model)
    },

    editSave () {
      FectherEntity(Reports)()
        .update(this.finishJob, this.model)
    }

  }

}
