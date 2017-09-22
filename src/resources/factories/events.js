'use strict'

import FactoryTenant from './factoryTenant'

class Events extends FactoryTenant {

  constructor(model={}, tenant=false) {
    super(model, "events", tenant)
  }
}

export default Events
