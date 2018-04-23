'use strict'

import FactoryTenant from './factoryTenant'

class Applications extends FactoryTenant {

  constructor(model={}, path='', tenant=false) {
    super(model, "applications"+path, tenant)
  }
}

export default Applications
