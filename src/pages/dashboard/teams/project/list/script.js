import Projects from 'factories/projects'

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
    cap(data) {
      return data.charAt(0).toUpperCase() + data.slice(1)
    },
    fetchData: function (query={}) {
      new Projects()
        .authorization()
        .list(query, (e) => {this.result = e.data})
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
    this.fetchData()
  }
}
