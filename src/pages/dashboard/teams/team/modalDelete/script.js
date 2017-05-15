import Teams from 'factories/teams'

export default {
  data () {
    return {
      showModal: false,
      text: {
        title: null
      },
      team: null
    }
  },

  methods: {

    show (team) {
      this.team = team
      this.text.title = `DELETE ${team.name} ?`
      this.showModal = true
    },

    closed () {
      this.showModal = false
    },

    deleteModel () {
      new Teams()
        .authorization()
        .delete(this.team._id, () => this.closed())
    }
  }

}
