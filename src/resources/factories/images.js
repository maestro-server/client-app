'use strict'

import FactoryTenant from './factoryTenant'

class Images extends FactoryTenant {

  constructor(model={}, path='', tenant=false) {
    super(model, "images"+path, tenant)
  }
}

export default Images
