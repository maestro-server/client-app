'use strict'

import FactoryTenant from './factoryTenant'

class Volumes extends FactoryTenant {

  constructor(model={}, tenant=false) {
    super(model, "volumes", tenant)
  }
}

export default Volumes
