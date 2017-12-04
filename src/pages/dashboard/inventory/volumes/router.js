'use strict'
import comp from './volumes'
import list from './list/router'
import single from './view/router'

export default {
  path: 'volumes',
  component: comp,
  children: [
    list,
    single
  ]
}
