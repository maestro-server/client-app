'use strict'

import FactoryTenant from './factoryTenant'

class FlavorsPublic extends FactoryTenant {

  constructor(model={}, path='', tenant=false) {
    super(model, "flavors_public"+path, tenant)
  }
}

export default FlavorsPublic
