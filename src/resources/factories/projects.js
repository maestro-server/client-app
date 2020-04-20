'use strict'

import FactoryTenant from './factoryTenant'

class Projects extends FactoryTenant {

  static ename = 'projects'

  constructor(model={}, path='', tenant=false) {
    const ename = Projects.ename
    super(model, ename + path, tenant)
    this.setName(ename)
  }
}

export default Projects
