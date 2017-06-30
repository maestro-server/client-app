import comp from './dashboard'
import home from './home/router'
import settings from './settings/router'
import teams from './teams/router'
import architectures from './architectures/router'
import applications from './applications/router'
import inventory from './inventory/router'

export default {
  path: '/dashboard',
  component: comp,
  children: [
    home,
    settings,
    teams,
    architectures,
    applications,
    inventory
  ]
}
