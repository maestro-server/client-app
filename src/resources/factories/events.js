'use strict'

import FactoryTenant from './factoryTenant'

class Events extends FactoryTenant {

  constructor(model={}, path='', tenant=false) {
    super(model, "events"+path, tenant)
  }
}

export default Events
