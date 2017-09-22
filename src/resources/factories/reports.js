'use strict'

import FactoryTenant from './factoryTenant'

class Reports extends FactoryTenant {

  constructor(model={}, tenant=false) {
    super(model, "reports", tenant)
  }
}

export default Reports
