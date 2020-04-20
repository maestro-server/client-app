'use strict'

import Modals from 'mixins/modals'
import Projects from 'factories/projects'
import FectherEntity from 'services/fetchEntity'

export default {
  mixins: [Modals],

  methods: {
    afterShow () {
      this.text.title = this.create ? 'Create new Project' : `Edit ${this.model.name} project`
    },

    createSave () {
      FectherEntity(Projects)()
        .create(this.finishJob, this.model)
    },

    editSave () {
      FectherEntity(Projects)()
        .update(this.finishJob, this.model)
    }

  }

}
