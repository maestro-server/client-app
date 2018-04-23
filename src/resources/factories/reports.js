'use strict'

import FactoryTenant from './factoryTenant'

class Reports extends FactoryTenant {

  constructor(model={}, path='', tenant=false) {
    super(model, "reports"+path, tenant)
  }
}

export default Reports
