'use strict'

import FactoryTenant from './factoryTenant'

class Clients extends FactoryTenant {

  static ename = 'clients'

  constructor(model={}, path='', tenant=false) {
    const ename = Clients.ename
    super(model, ename + path, tenant)
    this.setName(ename)
  }
}

export default Clients
