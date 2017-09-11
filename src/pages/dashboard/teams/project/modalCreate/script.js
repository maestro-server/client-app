'use strict'

import Modals from 'mixins/modals'
import Projects from 'factories/projects'
import FectherEntity from 'services/fetchEntity'

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
      FectherEntity(Projects)({k: 'projects_'+this.model._id})
        .update(this.finishJob, this.model)
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
