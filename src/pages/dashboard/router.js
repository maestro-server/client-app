import comp from './dashboard'
import home from './home/router'
import settings from './settings/router'

export default {
  path: '/dashboard',
  component: comp,
  children: [
    home,
    settings
  ]
}
