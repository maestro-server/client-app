'use strict'

import FactoryTenant from './factoryTenant'

class Datacenters extends FactoryTenant {
  constructor(model = {}, path='', tenant = false) {
    super(model, "datacenters"+path, tenant)
  }
}

export default Datacenters
