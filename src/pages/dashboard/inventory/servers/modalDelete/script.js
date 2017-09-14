'use strict'

import Modals from 'mixins/modals'
import Servers from 'factories/servers'
import FectherEntity from 'services/fetchEntity'

export default {
  mixins: [Modals],

  methods: {
    afterShow () {
      this.text.title = `DELETE ${this.model.hostname} ?`
    },

    editSave () {
      FectherEntity(Servers)({k: `server_${this.model._id}`})
        .remove(this.finishJob, this.model)
    }
  }

}
