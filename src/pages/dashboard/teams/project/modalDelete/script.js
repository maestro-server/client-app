'use strict'
import Modals from 'mixins/modals'
import Projects from 'factories/projects'
import FectherEntity from 'services/fetchEntity'

export default {
  mixins: [Modals],

  methods: {
    afterShow () {
      this.text.title = `DELETE ${this.model.name} ?`
    },

    editSave () {
      const k = 'projects_'+this.model._id

      FectherEntity(Projects)(this)({k})
        .remove(this.finishJob, this.model)
    }
  }

}
