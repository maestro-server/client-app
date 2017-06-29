
import FactoryTeam from './factoryTeam'

class Projects extends FactoryTeam {

  constructor(model={}, route="/projects") {
    super(model, route)
  }
}

export default Projects
