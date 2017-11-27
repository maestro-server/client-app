'use strict'
import comp from './connection'
import tlist from './list/router'
import single from './view/router'

export default {
  path: 'connections',
  redirect: 'connections/list',
  component: comp,
  children: [
    tlist,
    single
  ]
}
