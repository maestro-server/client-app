    'use strict'
import Modals from 'mixins/modals'
import Clients from 'factories/clients'

export default {
  mixins: [Modals],

  methods: {
    afterShow () {
      this.text.title = `DELETE ${this.model.name} ?`
    },

    editSave () {
      new Clients(this.model)
        .authorization()
        .deleteID(this.model._id, this.finishJob)
    }
  }

}
