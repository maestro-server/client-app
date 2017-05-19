
import Factory from './factory'

class Projects extends Factory {

  constructor(e="/projects") {
    super(e)
  }

  listByTeam (query={}, team, success) {
    this.entity = `/teams/${team}/projects`
    super.list(query, success)
  }

  createByTeam (data={}, success) {
    this.entity = `/teams/${data.team._id}/projects`
    super.create(data, success)
  }

  updateByTeam (data={}, success) {
    this.entity = `/teams/${data.team._id}/projects`
    super.update(data, success)
  }
}

export default Projects
