'use strict'

import FactoryTenant from './factoryTenant'

class TaskTemplate extends FactoryTenant {

  constructor(model={}, tenant=false) {
    super(model, "task_template", tenant)
  }
}

export default TaskTemplate
