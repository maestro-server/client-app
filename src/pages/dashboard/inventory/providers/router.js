'use strict'
import comp from './providers'
import list from './list/router'

export default {
  path: 'providers',
  component: comp,
  children: [
    list
  ]
}
