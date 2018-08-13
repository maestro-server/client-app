'use strict'

import FactoryTenant from './factoryTenant'

class Graphs extends FactoryTenant {

  constructor(model={}, path='', tenant=false) {
    super(model, "graphs"+path, tenant)
  }
}

export default Graphs
