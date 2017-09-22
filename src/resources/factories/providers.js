'use strict'

import FactoryTenant from './factoryTenant'

class Providers extends FactoryTenant {

  constructor(model={}, tenant=false) {
    super(model, "providers", tenant)
  }
}

export default Providers
