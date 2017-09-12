'use strict'
import comp from './datacenter'
import list from './list/router'

export default {
  name: 'inventory.datacenter',
  path: 'datacenter',
  component: comp,
  children: [
    list
  ]
}
