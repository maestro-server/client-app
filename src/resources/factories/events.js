'use strict'

import FactoryTenant from './factoryTenant'

class Events extends FactoryTenant {

  static ename = 'events'

  constructor(model={}, path='', tenant=false) {
    const ename = Events.ename
    super(model, ename + path, tenant)
    this.setName(ename)
  }
}

export default Events
