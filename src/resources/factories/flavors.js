'use strict'

import FactoryTenant from './factoryTenant'

class Flavors extends FactoryTenant {

  constructor(model={}, tenant=false) {
    super(model, "flavors", tenant)
  }
}

export default Flavors
