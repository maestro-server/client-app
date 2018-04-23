'use strict'

import FactoryTenant from './factoryTenant'

class Scheduler extends FactoryTenant {

  constructor(model={}, path='', tenant=false) {
    super(model, `scheduler${path}`, tenant)
  }
}

export default Scheduler
