'use strict'

import FactoryTenant from './factoryTenant'

class Architectures extends FactoryTenant {

  constructor(model={}, path='', tenant=false) {
    super(model, "architectures", tenant)
  }
}

export default Architectures
