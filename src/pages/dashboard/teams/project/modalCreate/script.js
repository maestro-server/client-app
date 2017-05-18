// import _ from 'lodash'
import Modals from 'mixins/modals'
import Projects from 'factories/projects'

export default {
  mixins: [Modals],

  methods: {
    afterShow () {
      this.text.title =  this.create ? 'Create new Project' : `Edit ${this.model.name} project`
    },

    createSave () {
      new Projects()
        .authorization()
        .create(this.model, this.finishJob)
    },

    editSave () {
        new Projects()
          .authorization()
          .patchID(this.model._id, this.model, this.finishJob)
    },

  }

}
