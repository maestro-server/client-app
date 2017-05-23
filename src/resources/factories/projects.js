
import Factory from './factory'

class Projects extends Factory {

  constructor(data={}, e="/projects") {
    super(data, e)

    if(this.isTeam()) {
      this.setEntity(`/teams/${this.model.team._id}/projects`)
    }
  }

  isTeam() {
    return _.has(this.model, 'team._id')
  }
}

export default Projects
