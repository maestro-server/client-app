
import Modals from 'mixins/modals'
import Teams from 'factories/teams'

export default {
  mixins: [Modals],

  data () {
    return {
      newMember: {},
      members: {}
    }
  },


  methods: {
    afterShow () {
      this.text.title =  this.edit ? 'Create new Team' : `Edit ${this.model.name} team`
    },


    addMember () {

    },

    successAddTeams () {
      this.closed()
      this.$parent.$refs.content.fetchData()
    }

  }

}
