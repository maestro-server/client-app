'use strict'

import Modals from 'mixins/modals'
import Teams from 'factories/teams'
import FectherEntity from 'services/fetchEntity'

export default {
  mixins: [Modals],

  data () {
    return {
      URL: `${API_URL}users/autocomplete?complete=`,
      templateMembers: "{{item.name}} - <small>{{item.email}}</small>"
    }
  },

  methods: {
    afterShow () {
      this.text.title =  this.create ? 'Create new Team' : `Edit ${this.model.name} team`
    },

    createSave () {
      FectherEntity(Teams)()
        .create(this.finishJob, this.model)
    },

    editSave () {
      FectherEntity(Teams)()
        .update(this.finishJob, this.model)
    }
  }

}
