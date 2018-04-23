'use strict'

import FactoryTenant from './factoryTenant'

class Networks extends FactoryTenant {

  constructor(model={}, path='', tenant=false) {
    super(model, "network"+path, tenant)
  }
}

export default Networks
