'use strict'

import FactoryTenant from './factoryTenant'

class Playbooks extends FactoryTenant {

  constructor(model={}, tenant=false) {
    super(model, "playbooks", tenant)
  }
}

export default Playbooks
