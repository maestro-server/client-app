'use strict'
import comp from './network'
import list from './list/router'
import single from './view/router'

export default {
  path: 'network',
  component: comp,
  children: [
    list,
    single
  ]
}
