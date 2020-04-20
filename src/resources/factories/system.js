'use strict'

import FactoryTenant from './factoryTenant'

class System extends FactoryTenant {

  static ename = 'system'

    constructor(model={}, path='', tenant=false) {
    const ename = System.ename
    super(model, ename + path, tenant)
    this.setName(ename)
  }
}

export default System
