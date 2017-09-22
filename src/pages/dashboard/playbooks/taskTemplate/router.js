'use strict'
import comp from './taskTemplate'
import list from './list/router'
import single from './view/router'

export default {
  path: 'task-template',
  component: comp,
  children: [
    list,
    single
  ]
}
