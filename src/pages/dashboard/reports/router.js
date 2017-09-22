'use strict'
import comp from './reports'

import reports from './reports/router'
import events from './events/router'

export default {
  path: 'reports',
  redirect: 'reports/reports/list',
  component: comp,
  children: [
    reports,
    events
  ]
}
