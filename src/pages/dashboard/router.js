import comp from './dashboard'
import home from './home/router'
import settings from './settings/router'
import teams from './teams/router'
import architectures from './architectures/router'

export default {
  name: 'dashboard',
  path: '/dashboard',
  component: comp,
  children: [
    home,
    settings,
    teams,
    architectures
  ]
}
