'use strict'

import FactoryTenant from './factoryTenant'

class System extends FactoryTenant {
  constructor(model={}, tenant=false) {
    super(model, "/system", tenant)
  }
}

export default System
