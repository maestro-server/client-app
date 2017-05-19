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
      const Project = new Projects().authorization()

      if(_.has(this.model, 'team')) {
        Project.createByTeam(this.model, this.finishJob)
      } else {
        Project.create(this.model, this.finishJob)
      }
    },

    editSave () {
        new Projects()
          .authorization()
          .patchID(this.model._id, this.model, this.finishJob)
    },

    setTeam(item) {
      console.log(item)
      this.$set(this.model, 'team', item)
      return this
    },

    teamSelected(item) {
      this.setTeam(item)
    }

  }

}
