import comp from './dashboard'
import profile from './profile/router'

export default {
  path: '/dashboard',
  name: 'Dashboard',
  component: comp,
  children: [
    profile
  ]
}
