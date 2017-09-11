'use strict'

import FactoryTenant from './factoryTenant'

class Servers extends FactoryTenant {

  constructor(model={}, tenant=false) {
    super(model, "/servers", tenant)
  }
}

export default Servers
