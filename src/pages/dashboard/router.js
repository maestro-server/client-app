import comp from './dashboard'
import home from './home/router'
import profile from './profile/router'

export default {
  path: '/dashboard',
  name: 'dashboard',
  component: comp,
  children: [
    home,
    profile
  ]
}
