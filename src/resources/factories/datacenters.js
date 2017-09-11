'use strict'

import FactoryTenant from './factoryTenant'

class Datacenters extends FactoryTenant {
  constructor(model={}, tenant=false) {
    super(model, "/datacenters", tenant)
  }
}

export default Datacenters
