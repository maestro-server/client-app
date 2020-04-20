'use strict'

import FactoryTenant from './factoryTenant'

class Datacenters extends FactoryTenant {

  static ename = 'datacenters'

  constructor(model = {}, path='', tenant = false) {
    const ename = Datacenters.ename
    super(model, ename + path, tenant)
    this.setName(ename)
  }
}

export default Datacenters
