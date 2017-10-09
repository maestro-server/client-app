'use strict'
import comp from './settings'
import single from './single/router'

export default {
  path: 'settings',
  component: comp,
  children: [
    single
  ]
}
