'use strict'

import FactoryTenant from './factoryTenant'

class Reports extends FactoryTenant {

  static ename = 'reports'

  constructor (model = {}, path = '', tenant = false) {
    const ename = Reports.ename
    super(model, ename + path, tenant)
    this.setName(ename)
  }
}

export default Reports
