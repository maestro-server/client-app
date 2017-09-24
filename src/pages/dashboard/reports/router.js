'use strict'
import comp from './reports'

import exports from './exports/router'
import events from './events/router'

export default {
  name: 'reports',
  path: 'reports',
  redirect: 'reports/exports',
  component: comp,
  children: [
    exports,
    events
  ]
}
