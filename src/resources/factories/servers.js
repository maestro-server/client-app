'use strict'

import FactoryTenant from './factoryTenant'

class Servers extends FactoryTenant {

  constructor(model={}, path='', tenant=false) {
    super(model, "servers"+path, tenant)
  }
}

export default Servers
