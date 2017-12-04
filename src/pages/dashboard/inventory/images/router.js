'use strict'
import comp from './images'
import list from './list/router'
import single from './view/router'

export default {
  path: 'images',
  component: comp,
  children: [
    list,
    single
  ]
}
