'use strict'

import FactoryTenant from './factoryTenant'

class Snapshots extends FactoryTenant {

  constructor(model={}, path='', tenant=false) {
    super(model, "snapshots"+path, tenant)
  }
}

export default Snapshots
