'use strict'
import comp from './datacenter'
import list from './list/router'

export default {
  path: 'datacenter',
  component: comp,
  children: [
    list
  ]
}
