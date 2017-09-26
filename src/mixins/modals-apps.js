'use strict'
import _ from 'lodash'
import Servers from 'factories/servers'
import Applications from 'factories/applications'
import Adminer from 'factories/adminer'
import FectherEntity from 'services/fetchEntity'

export default {
  methods: {
    afterShow () {
      this.text.title =  this.create ? `Create new ${this.family}s` : `Edit ${this.model.name} ${this.family.toLowerCase()}s`
    },

    editLoadServers(fielder) {
      if (!_.isEmpty(this.model[fielder])) {
        FectherEntity(Servers)()
          .find((e) => {
            this[`tab_${fielder}`].updaterEdit(_.get(e, 'data.items', []))
          }, {_id: this.model[fielder]})
      }
    },

    setupModel () {
      _.set(this.data, 'family', this.family)
      this.model = _.pickBy(this.data, _.identity)
    },

    createSave () {
      this.setupModel()

      FectherEntity(Applications)()
        .create(this.finishJob, this.model)
    },

    editSave () {
      this.setupModel()

      FectherEntity(Applications)()
        .update(this.finishJob, this.model)
    },

    fetchData() {
      const key = `${this.family.toLowerCase()}_options`

      FectherEntity(Adminer)({persistence: 'local'})
        .find(this.fetchAdminer, {key})
    }

  },

  created() {
    this.fetchData()
  }
}
