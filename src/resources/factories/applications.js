
import FactoryTeam from './factoryTeam'

class Applications extends FactoryTeam {

  constructor(model={}, route="/applications") {
    super(model, route)
  }
}

export default Applications
