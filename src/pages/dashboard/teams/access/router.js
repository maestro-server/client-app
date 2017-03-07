import comp from './access'
import tcreate from './create/router'
import tedit from './edit/router'
import tlist from './list/router'

export default {
  path: 'access',
  redirect: 'access/list',
  component: comp,
  children: [
    tcreate,
    tedit,
    tlist
  ]
}
