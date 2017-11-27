'use strict'

import FactoryTenant from './factoryTenant'

class Connections extends FactoryTenant {

  constructor(model={}, tenant=false) {
    super(model, "connections", tenant)
  }
}

export default Connections
