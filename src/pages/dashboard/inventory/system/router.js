'use strict'
import comp from './system'
import list from './list/router'
import single from './view/router'

export default {
  path: 'system',
  component: comp,
  children: [
    list,
    single
  ]
}
