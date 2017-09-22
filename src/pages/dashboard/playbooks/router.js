'use strict'
import comp from './playbooks'
import project from './project/router'
import playbook from './playbook/router'

import taskTemplate from './taskTemplate/router'
import jobs from './jobs/router'
import scheduler from './scheduler/router'
import accessManager from './accessManager/router'

export default {
  path: 'playbooks',
  redirect: 'playbooks/playbook/list',
  component: comp,
  children: [
    project,
    playbook,
    taskTemplate,
    jobs,
    scheduler,
    accessManager
  ]
}
