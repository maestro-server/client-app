'use strict'

import FactoryTenant from './factoryTenant'

class Projects extends FactoryTenant {

  constructor(model={}, tenant=false) {
    super(model, "/projects", tenant)
  }
}

export default Projects
