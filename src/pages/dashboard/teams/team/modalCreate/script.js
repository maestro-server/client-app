
import Modals from 'mixins/modals'
import Teams from 'factories/teams'

export default {
  mixins: [Modals],

  data () {
    return {
      SELemail: null,
      newMember: {},
      members: [],
      URL: "http://localhost:8888/users/autocomplete?complete=",
      templateMembers: "{{item.name}} - <small>{{item.email}}</small>"
    }
  },


  methods: {
    afterShow () {
      this.text.title =  this.create ? 'Create new Team' : `Edit ${this.model.name} team`
    },

    addMember () {

    },

    createSave () {
      new Teams()
        .authorization()
        .create(this.model, this.finishJob)
    },

    editSave () {
      new Teams()
        .authorization()
        .update(this.model._id, this.model, this.finishJob)
    },

    memberSelected(item) {
      this.members.push(item)
    }

  }

}
