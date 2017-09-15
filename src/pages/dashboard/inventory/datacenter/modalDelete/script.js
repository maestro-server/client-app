'use strict'
import Modals from 'mixins/modals'
import Datacenters from 'factories/datacenters'
import FectherEntity from 'services/fetchEntity'

export default {
  mixins: [Modals],

  methods: {
    afterShow () {
      this.text.title = `DELETE ${this.model.name} ?`
    },

    editSave () {
      FectherEntity(Datacenters)(this)()
        .remove(this.finishJob, this.model)
    }
  }

}
