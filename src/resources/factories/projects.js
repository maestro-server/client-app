'use strict'

import FactoryTenant from './factoryTenant'

class Projects extends FactoryTenant {

  constructor(model={}, path='', tenant=false) {
    super(model, "projects"+path, tenant)
  }
}

export default Projects
