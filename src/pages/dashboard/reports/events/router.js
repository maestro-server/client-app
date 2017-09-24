'use strict'
import comp from './event'
import list from './list/router'
import single from './view/router'

export default {
  path: 'events',
  component: comp,
  children: [
    list,
    single
  ]
}
