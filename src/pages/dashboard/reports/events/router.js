'use strict'
import comp from './event'
import list from './list/router'

export default {
  path: 'events',
  component: comp,
  children: [
    list
  ]
}
