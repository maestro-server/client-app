'use strict'
import _ from 'lodash'
import Modals from 'mixins/modals'
import Teams from 'factories/teams'
import FectherEntity from 'services/fetchEntity'

export default {
  mixins: [Modals],

  data () {
    return {
      URL: "http://localhost:8888/users/autocomplete?complete=",
      templateMembers: "{{item.name}} - <small>{{item.email}}</small>"
    }
  },


  methods: {
    afterShow () {
      this.text.title =  this.create ? 'Create new Team' : `Edit ${this.model.name} team`
    },

    createSave () {
      new Teams(this.model)
        .authorization()
        .create(this.finishJob)
    },

    editSave () {
      FectherEntity(Teams)()
        .update(this.finishJob, this.model)
    },

    deleteUser (team) {
      const narr = this.model.members.filter(e => e != team)
      this.model.members = narr
    },

    memberSelected(item) {
      const exist = _.find(this.model.members, ['_id', item._id])

      if(!exist) {
        item.role=1
        this.model.members.push(item)
      }
    },

    afterClose() {
      this.model.members = []
    }

  }

}
