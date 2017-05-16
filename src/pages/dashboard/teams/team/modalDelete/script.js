import Modals from 'mixins/modals'
import Teams from 'factories/teams'

export default {
  mixins: [Modals],

  methods: {
    afterShow () {
      this.text.title = `DELETE ${this.model.name} ?`
    },

    editSave () {
      new Teams()
        .authorization()
        .delete(this.model._id, this.finishJob)
    }
  }

}
