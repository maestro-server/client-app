'use strict'

import FactoryTenant from './factoryTenant'

class Scheduler extends FactoryTenant {

  constructor(model={}, tenant=false) {
    super(model, "scheduler", tenant)
  }
}

export default Scheduler
