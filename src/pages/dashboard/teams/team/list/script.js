
import Teams from 'factories/teams'

export default {
  data: function () {
    return {
      teams: []
    }
  },

  mounted () {
    new Teams()
      .authorization()
      .list((e) => {console.log(e.data); Object.assign(this.teams, e.data)})
  }
}
