'use strict'
// import _ from 'lodash'
import Modals from 'mixins/modals'
import Applications from 'factories/applications'

export default {
  mixins: [Modals],

  data () {
    return {
      URL: "http://localhost:8888/teams/autocomplete?complete=",
      template: "{{item.name}} - <small>{{item.email}}</small>"
    }
  },

  methods: {
    afterShow () {
      this.text.title =  this.create ? 'Create new Application' : `Edit ${this.model.name} application`
    },

    createSave () {
      new Applications(this.model)
      .authorization()
      .create(this.finishJob)
    },

    editSave () {
      new Applications(this.model)
      .authorization()
      .patchID(this.model._id, this.finishJob)
    },

    setTeam(item) {
      this.$set(this.model, 'team', item)
      return this
    },

    teamSelected(item) {
      this.setTeam(item)
      this.model.input = ""
    }

  }

}
