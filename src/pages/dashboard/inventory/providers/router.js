'use strict'
import comp from './provider'
import tlist from './list/router'
import single from './view/router'

export default {
  name: 'providers',
  path: 'providers',
  redirect: 'providers/list',
  component: comp,
  children: [
    tlist,
    single
  ]
}
