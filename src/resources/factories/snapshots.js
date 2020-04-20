'use strict'

import FactoryTenant from './factoryTenant'

class Snapshots extends FactoryTenant {

  static ename = 'snapshots'

  constructor(model={}, path='', tenant=false) {
    const ename = Snapshots.ename
    super(model, ename + path, tenant)
    this.setName(ename)
  }
}

export default Snapshots
