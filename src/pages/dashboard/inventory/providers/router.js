'use strict'
import comp from './providers'
import list from './list/router'

export default {
  name: 'providers',
  path: 'providers',
  component: comp,
  children: [
    list
  ]
}
