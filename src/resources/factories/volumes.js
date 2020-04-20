'use strict'

import FactoryTenant from './factoryTenant'

class Volumes extends FactoryTenant {

  static ename = 'volumes'

  constructor(model={}, path='', tenant=false) {
    const ename = Volumes.ename
    super(model, ename + path, tenant)
    this.setName(ename)
  }
}

export default Volumes
