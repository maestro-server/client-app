'use strict'

import FactoryTenant from './factoryTenant'

class Graphs extends FactoryTenant {

  static ename = 'graphs'

  constructor(model={}, path='', tenant=false) {
    const ename = Graphs.ename
    super(model, ename + path, tenant)
    this.setName(ename)
  }
}

export default Graphs
