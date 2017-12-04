'use strict'
import comp from './snapshot'
import list from './list/router'
import single from './view/router'

export default {
  path: 'snapshots',
  component: comp,
  children: [
    list,
    single
  ]
}
