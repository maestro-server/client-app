'use strict'
import Modals from 'mixins/modals'
import Applications from 'factories/applications'

export default {
  mixins: [Modals],

  methods: {
    afterShow () {
      this.text.title = `DELETE ${this.model.name} ?`
    },

    editSave () {
      new Applications(this.model)
        .authorization()
        .deleteID(this.model._id, this.finishJob)
    }
  }

}
