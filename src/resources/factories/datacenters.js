'use strict'

import FactoryTeam from './factoryTeam'

class Datacenters extends FactoryTeam {
  constructor(model={}, route="/datacenters") {
    super(model, route)
  }
}

export default Datacenters
