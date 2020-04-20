'use strict'

import FactoryTenant from './factoryTenant'

class Applications extends FactoryTenant {

  static ename = 'applications'

  constructor(model={}, path='', tenant=false) {
    const ename = Applications.ename
    super(model, ename + path, tenant)
    this.setName(ename)
  }
}

export default Applications
