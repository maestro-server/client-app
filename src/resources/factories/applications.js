'use strict'

import FactoryTenant from './factoryTenant'

class Applications extends FactoryTenant {

  constructor(model={}, tenant=false) {
    super(model, "/applications", tenant)
  }
}

export default Applications
