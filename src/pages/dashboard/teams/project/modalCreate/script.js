'use strict'
// import _ from 'lodash'
import Modals from 'mixins/modals'
import Projects from 'factories/projects'

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
      this.text.title =  this.create ? 'Create new Project' : `Edit ${this.model.name} project`
    },

    createSave () {
      new Projects(this.model)
      .authorization()
      .create(this.finishJob)
    },

    editSave () {
      new Projects(this.model)
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
