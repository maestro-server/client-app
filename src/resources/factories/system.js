'use strict'

import FactoryTeam from './factoryTeam'

class System extends FactoryTeam {
  constructor(model={}, route="/system") {
    super(model, route)
  }
}

export default System
