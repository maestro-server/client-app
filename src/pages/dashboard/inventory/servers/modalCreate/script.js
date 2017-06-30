// import _ from 'lodash'
import Modals from 'mixins/modals'
import Architectures from 'factories/architectures'

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
      this.text.title =  this.create ? 'Create new Architecture' : `Edit ${this.model.name} architecture`
    },

    createSave () {
      new Architectures(this.model)
      .authorization()
      .create(this.finishJob)
    },

    editSave () {
      new Architectures(this.model)
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
