'use strict'

import FactoryTenant from './factoryTenant'

class Jobs extends FactoryTenant {

  constructor(model={}, path='', tenant=false) {
    super(model, "jobs"+path, tenant)
  }
}

export default Jobs
