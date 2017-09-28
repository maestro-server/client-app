'use strict'
import comp from './applications'
import list from './list/router'
import single from './view/router'

export default {
  path: 'vpn',
  component: comp,
  children: [
    list,
    single
  ]
}
