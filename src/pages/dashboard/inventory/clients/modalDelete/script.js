    'use strict'
import Modals from 'mixins/modals'
import Clients from 'factories/clients'
    import FectherEntity from 'services/fetchEntity'

export default {
  mixins: [Modals],

  methods: {
    afterShow () {
      this.text.title = `DELETE ${this.model.name} ?`
    },

    editSave () {
      const k = 'client_'+this.model._id

      FectherEntity(Clients)(this)({k})
        .remove(this.finishJob, this.model)
    }
  }

}
