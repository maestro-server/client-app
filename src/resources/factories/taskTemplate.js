'use strict'

import FactoryTenant from './factoryTenant'

class TaskTemplate extends FactoryTenant {

  constructor(model={}, path='', tenant=false) {
    super(model, "task_template"+path, tenant)
  }
}

export default TaskTemplate
