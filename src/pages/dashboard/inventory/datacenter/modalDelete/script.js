'use strict'
import Modals from 'mixins/modals'
import Datacenters from 'factories/datacenters'

export default {
  mixins: [Modals],

  methods: {
    afterShow () {
      this.text.title = `DELETE ${this.model.name} ?`
    },

    editSave () {
      new Datacenters(this.model)
        .authorization()
        .deleteID(this.model._id, this.finishJob)
    }
  }

}
