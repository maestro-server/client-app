
import Teams from 'factories/teams'

export default {
  data: function () {
    return {
      result: {
        items: []
      }
    }
  },

  methods: {
    fetchData: function (query={}) {
      new Teams()
        .authorization()
        .list(query, (e) => {this.result = e.data})
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
    },

    changePage (page) {
      this.fetchData({page})
    }
  },

  created () {
    this.fetchData()
  }
}
