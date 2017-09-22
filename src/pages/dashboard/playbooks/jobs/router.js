'use strict'
import comp from './jobs'
import list from './list/router'
import single from './view/router'

export default {
  path: 'jobs',
  component: comp,
  children: [
    list,
    single
  ]
}
