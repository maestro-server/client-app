'use strict'
import comp from './applications'
import list from './list/router'
import single from './view/router'

export default {
  path: 'databases',
  component: comp,
  children: [
    list,
    single
  ]
}
