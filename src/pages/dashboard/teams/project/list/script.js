import Projects from 'factories/projects'

export default {
  data: function () {
    return {
      result: {
        items: []
      },
      team:false
    }
  },

  computed: {
    MCreate () {return this.$parent.$refs.modal_create},
    MDelete () {return this.$parent.$refs.modal_delete},
    title () {
      return this.team ? this.team.name+' Projects' : 'My Projects'
    }
  },

  methods: {
    cap(data) {
      return data.charAt(0).toUpperCase() + data.slice(1)
    },

    fetchData: function (query={}) {
      const Project = new Projects().authorization()

      if(this.team) {
        Project.listByTeam(query, this.team._id, (e) => {this.result = e.data})
      } else {
        Project.list(query, (e) => {this.result = e.data})
      }
    },

    addProject: function () {

      this.MCreate
        .setupSteps(1,1,1)
        .onFinishCallBack(() => {this.fetchData()})
        .show()
    },

    editProject: function (project) {
      this.MCreate
        .setupSteps(1,1,1)
        .onFinishCallBack((e) => {
          project.name = e.name
          project.email = e.email
        })
        .show(project)
    },

    deleteProject: function (project) {
      this.MDelete
        .onFinishCallBack(() => {
          const narr = this.result.items.filter((e) => {
            return e != project
          })
          this.result.items = narr
        })
        .show(project)
    },

    changePage (page) {
      this.fetchData({page})
    }
  },

  created () {
    if(_.has(this.$route, 'query.team_id')) {
      this.team = {
        '_id': this.$route.query.team_id,
        'name': this.$route.query.team_name
      }
    }


    this.fetchData()
  }
}
