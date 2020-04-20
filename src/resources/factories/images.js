'use strict'

import FactoryTenant from './factoryTenant'

class Images extends FactoryTenant {

  static ename = 'images'

  constructor(model={}, path='', tenant=false) {
    const ename = Images.ename
    super(model, ename + path, tenant)
    this.setName(ename)
  }
}

export default Images
