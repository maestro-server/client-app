'use strict'
import comp from './flavors'
import list from './list/router'
import single from './view/router'

export default {
  path: 'flavors',
  component: comp,
  children: [
    list,
    single
  ]
}
