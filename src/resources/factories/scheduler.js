'use strict'

import FactoryTenant from './factoryTenant'

class Scheduler extends FactoryTenant {

  static ename = 'scheduler'

  constructor (model = {}, path = '', tenant = false) {
    const ename = Scheduler.ename
    super(model, ename + path, tenant)
    this.setName(ename)
  }
}

export default Scheduler
