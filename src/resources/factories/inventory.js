
import FactoryTeam from './factoryTeam'

class Inventory extends FactoryTeam {
  constructor(model={}, route="/inventory") {
    super(model, route)
  }
}

export default Inventory
