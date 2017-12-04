'use strict'

import FactoryTenant from './factoryTenant'

class Networks extends FactoryTenant {

  constructor(model={}, tenant=false) {
    super(model, "network", tenant)
  }
}

export default Networks
