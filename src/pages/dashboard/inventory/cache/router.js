'use strict'
import comp from './applications'
import list from './list/router'
import single from './view/router'

export default {
  path: 'cache',
  component: comp,
  children: [
    list,
    single
  ]
}
