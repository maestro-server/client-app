'use strict'

import FactoryTenant from './factoryTenant'

class Flavors extends FactoryTenant {

  constructor(model={}, path='', tenant=false) {
    super(model, "flavors"+path, tenant)
  }
}

export default Flavors
