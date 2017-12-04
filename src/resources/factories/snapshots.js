'use strict'

import FactoryTenant from './factoryTenant'

class Snapshots extends FactoryTenant {

  constructor(model={}, tenant=false) {
    super(model, "snapshots", tenant)
  }
}

export default Snapshots
