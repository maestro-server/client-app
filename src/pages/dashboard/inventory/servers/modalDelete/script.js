'use strict'
import Modals from 'mixins/modals'
import Servers from 'factories/servers'

export default {
  mixins: [Modals],

  methods: {
    afterShow () {
      this.text.title = `DELETE ${this.model.hostname} ?`
    },

    editSave () {
      new Servers(this.model)
        .authorization()
        .deleteID(this.model._id, this.finishJob)
    }
  }

}
