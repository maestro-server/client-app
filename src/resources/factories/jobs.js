'use strict'

import FactoryTenant from './factoryTenant'

class Jobs extends FactoryTenant {

  constructor(model={}, tenant=false) {
    super(model, "jobs", tenant)
  }
}

export default Jobs
