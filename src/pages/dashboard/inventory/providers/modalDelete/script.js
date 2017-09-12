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
      const k = 'datacenter_'+this.model._id

      FectherEntity(Datacenters)(this)({k})
        .remove(this.finishJob, this.model)
    }
  }

}
