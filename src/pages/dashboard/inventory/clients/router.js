'use strict'
import comp from './clients'
import list from './list/router'
import single from './view/router'

export default {
  path: 'clients',
  component: comp,
  children: [
    list,
    single
  ]
}
