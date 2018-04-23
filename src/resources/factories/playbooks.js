'use strict'

import FactoryTenant from './factoryTenant'

class Playbooks extends FactoryTenant {

  constructor(model={}, path='', tenant=false) {
    super(model, "playbooks"+path, tenant)
  }
}

export default Playbooks
