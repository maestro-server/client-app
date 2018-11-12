'use strict'
import comp from './gbussiness'
import tlist from './list/router'
import single from './view/router'

export default {
  path: 'graphs',
  component: comp,
  children: [
    tlist,
    single
  ]
}
