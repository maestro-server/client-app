
import FactoryTeam from './factoryTeam'

class Servers extends FactoryTeam {
  constructor(model={}, route="/servers") {
    super(model, route)
  }
}

export default Servers
