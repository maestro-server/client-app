'use strict'

import FactoryTenant from './factoryTenant'

class Clients extends FactoryTenant {

  constructor(model={}, path='', tenant=false) {
    super(model, "clients"+path, tenant)
  }
}

export default Clients
