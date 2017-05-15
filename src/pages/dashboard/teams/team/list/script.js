
import Teams from 'factories/teams'

export default {
  data: function () {
    return {
      result: {
        items: []
      }
    }
  },

  computed: {
    MCreate () {return this.$parent.$refs.modal_create},
    MDelete () {return this.$parent.$refs.modal_delete}
  },

  methods: {
    fetchData: function (query={}) {
      new Teams()
        .authorization()
        .list(query, (e) => {this.result = e.data})
    },

    addTeam: function () {
      this.MCreate
        .onFinishCallBack(() => {this.fetchData()})
        .show()
    },

    addUsers: function (team) {
      this.MCreate
        .setupSteps(2,2,2)
        .show(team, 2)
    },

    editTeam: function (team) {
      this.MCreate
        .setupSteps(1,1,1)
        .show(team)
    },

    deleteTeam: function (team) {
      this.MDelete.show(team)
    },

    changePage (page) {
      this.fetchData({page})
    }
  },

  created () {
    this.fetchData()
  }
}
