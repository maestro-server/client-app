'use strict'

import FactoryTenant from './factoryTenant'

class Images extends FactoryTenant {

  constructor(model={}, tenant=false) {
    super(model, "images", tenant)
  }
}

export default Images
