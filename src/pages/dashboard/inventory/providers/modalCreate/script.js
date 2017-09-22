'use strict'

import Modals from 'mixins/modals'
import Providers from 'factories/providers'
import FectherEntity from 'services/fetchEntity'

export default {
  mixins: [Modals],

  methods: {
    afterShow () {
      this.text.title =  this.create ? 'Create new Provider' : `Edit ${this.model.name} provider`
    },

    createSave () {
      FectherEntity(Providers)()
        .create(this.finishJob, this.model)
    },

    editSave () {
      FectherEntity(Providers)()
        .update(this.finishJob, this.model)
    }

  }

}
