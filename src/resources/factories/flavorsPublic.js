'use strict'

import FactoryTenant from './factoryTenant'

class FlavorsPublic extends FactoryTenant {

  constructor(model={}, path='', tenant=false) {
    const ename = 'flavors_public'
    super(model, ename + path, tenant)
    this.setName(ename)
  }
}

export default FlavorsPublic
