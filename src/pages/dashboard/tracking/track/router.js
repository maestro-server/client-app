'use strict'
import comp from './track'
import single from './view/router'

export default {
  name: 'track',
  path: 'track',
  component: comp,
  children: [
    single
  ]
}
