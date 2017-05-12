
import Teams from 'factories/teams'

export default {
  data: function () {
    return {
      teams: []
    }
  },

  methods: {
    fetchData: function () {
      new Teams()
        .authorization()
        .list((e) => {this.teams = e.data.items})
    },
    callCreateModal: function () {
      this.$parent.$refs.modal_create.createModal = true
    },

    addUsers: function (team) {
      console.log(team)
    },

    editTeam: function (team) {
      console.log(team)
    },

    deleteTeam: function (team) {
      console.log(team)
    }
  },

  created () {
    this.fetchData()
  }
}
