'use strict'
import comp from './exports'
import list from './list/router'
import single from './view/router'

export default {
  path: 'exports',
  component: comp,
  children: [
    list,
    single
  ]
}
