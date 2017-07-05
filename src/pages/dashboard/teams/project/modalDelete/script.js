'use strict'
import Modals from 'mixins/modals'
import Projects from 'factories/projects'

export default {
  mixins: [Modals],

  methods: {
    afterShow () {
      this.text.title = `DELETE ${this.model.name} ?`
    },

    editSave () {
      new Projects(this.model)
        .authorization()
        .deleteID(this.model._id, this.finishJob)
    }
  }

}
