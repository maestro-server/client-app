'use strict'

import FactoryTenant from './factoryTenant'

class Volumes extends FactoryTenant {

  constructor(model={}, path='', tenant=false) {
    super(model, "volumes"+path, tenant)
  }
}

export default Volumes
