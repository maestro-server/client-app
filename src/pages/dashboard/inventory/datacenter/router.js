'use strict'
import comp from './datacenter'
import list from './list/router'
import single from './view/router'
import analytics from './analytics/router'

export default {
  path: 'datacenter',
  component: comp,
  children: [
    list,
    single,
    analytics
  ]
}
