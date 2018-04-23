'use strict'

import FactoryTenant from './factoryTenant'

class System extends FactoryTenant {
  constructor(model={}, path='', tenant=false) {
    super(model, "system"+path, tenant)
  }
}

export default System
