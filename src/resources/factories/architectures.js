'use strict'

import FactoryTeam from './factoryTeam'

class Architectures extends FactoryTeam {

  constructor(model={}, route="/architectures") {
    super(model, route)
  }
}

export default Architectures
