'use strict'

import FactoryTeam from './factoryTeam'

class Clients extends FactoryTeam {

  constructor(model={}, route="/clients") {
    super(model, route)
  }
}

export default Clients
