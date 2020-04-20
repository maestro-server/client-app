'use strict'

import FactoryTenant from './factoryTenant'

class Network extends FactoryTenant {

  static ename = 'network'

  constructor (model = {}, path = '', tenant = false) {
    const ename = Network.ename
    super(model, ename + path, tenant)
    this.setName(ename)
  }
}

export default Network
