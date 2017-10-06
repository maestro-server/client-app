'use strict'

import comp from './dashboard'
import home from './home/router'
import teams from './teams/router'
import profile from './profile/router'
import inventory from './inventory/router'
import playbooks from './playbooks/router'
import reports from './reports/router'

export default {
  path: '/dashboard',
  component: comp,
  children: [
    home,
    profile,
    teams,
    inventory,
    playbooks,
    reports
  ]
}
