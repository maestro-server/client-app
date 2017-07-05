'use strict'
import Modals from 'mixins/modals'
import Architectures from 'factories/architectures'

export default {
  mixins: [Modals],

  methods: {
    afterShow () {
      this.text.title = `DELETE ${this.model.name} ?`
    },

    editSave () {
      new Architectures(this.model)
        .authorization()
        .deleteID(this.model._id, this.finishJob)
    }
  }

}
