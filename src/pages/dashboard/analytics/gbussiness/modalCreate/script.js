'use strict'

import Modals from 'mixins/modals'
import Graphs from 'factories/graphs'
import FectherEntity from 'services/fetchEntity'

export default {
  mixins: [Modals],

  methods: {
    afterShow () {
      this.text.title =  this.create ? 'Create new Graph' : `Edit ${this.model.name} graph`
    },

    createSave () {
      FectherEntity(Graphs)()
        .create(this.finishJob, this.model)
    },

    editSave () {
      FectherEntity(Graphs)()
        .update(this.finishJob, this.model)
    }

  }

}
