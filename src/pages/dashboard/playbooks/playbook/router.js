'use strict'
import comp from './playbook'
import list from './list/router'
import single from './view/router'

export default {
  path: 'playbook',
  component: comp,
  children: [
    list,
    single
  ]
}
