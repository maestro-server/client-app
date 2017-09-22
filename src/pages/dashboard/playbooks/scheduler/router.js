'use strict'
import comp from './scheduler'
import list from './list/router'
import single from './view/router'

export default {
  path: 'scheduler',
  component: comp,
  children: [
    list,
    single
  ]
}
