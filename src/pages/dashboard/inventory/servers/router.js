'use strict'
import comp from './servers'
import list from './list/router'
import single from './view/router'

export default {
  name: 'servers',
  path: 'servers',
  component: comp,
  children: [
    list,
    single
  ]
}
