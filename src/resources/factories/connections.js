'use strict'

import FactoryTenant from './factoryTenant'

class Connections extends FactoryTenant {

  static ename = 'connections'

  constructor(model={}, path='', tenant=false) {
    const ename = Connections.ename
    super(model, ename + path, tenant)
    this.setName(ename)
  }
}

export default Connections
