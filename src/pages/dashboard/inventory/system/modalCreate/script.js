'use strict'
// import _ from 'lodash'
import Modals from 'mixins/modals'
import System from 'factories/system'

export default {
  mixins: [Modals],

  data () {
    return {
      URL: API_URL+"/teams/autocomplete?complete=",
      template: "{{item.name}} - <small>{{item.email}}</small>"
    }
  },

  methods: {
    afterShow () {
      this.text.title =  this.create ? 'Create new System' : `Edit ${this.model.name} system`
    },

    createSave () {
      new System(this.model)
      .authorization()
      .create(this.finishJob)
    },

    editSave () {
      new System(this.model)
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
