'use strict'

import FactoryTenant from './factoryTenant'

class Connections extends FactoryTenant {

  constructor(model={}, path='', tenant=false) {
    super(model, "connections"+path, tenant)
  }
}

export default Connections
