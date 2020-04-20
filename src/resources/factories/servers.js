'use strict'

import FactoryTenant from './factoryTenant'

class Servers extends FactoryTenant {

  static ename = 'servers'

  constructor (model = {}, path = '', tenant = false) {
    const ename = Servers.ename
    super(model, ename + path, tenant)
    this.setName(ename)
  }
}

export default Servers
