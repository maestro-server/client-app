import comp from './access'
import tlist from './list/router'

export default {
  path: 'access',
  redirect: 'access/list',
  component: comp,
  children: [
    tlist
  ]
}
