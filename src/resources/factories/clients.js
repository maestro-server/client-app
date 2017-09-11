'use strict'

import FactoryTenant from './factoryTenant'

class Clients extends FactoryTenant {

  constructor(model={}, tenant=false) {
    super(model, "/clients", tenant)
  }
}

export default Clients
