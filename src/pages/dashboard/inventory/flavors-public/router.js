'use strict'
import comp from './flavors'
import list from './list/router'
import single from './view/router'

export default {
  path: 'flavors_public',
  component: comp,
  children: [
    list,
    single
  ]
}
