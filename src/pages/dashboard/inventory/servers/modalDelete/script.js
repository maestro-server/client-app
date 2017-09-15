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
      FectherEntity(Servers)()
        .remove(this.finishJob, this.model)
    }
  }

}
