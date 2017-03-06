import comp from './team'
import tcreate from './create/router'
import tedit from './edit/router'
import tlist from './list/router'

export default {
  path: 'team',
  redirect: 'team/list',
  component: comp,
  children: [
    tcreate,
    tedit,
    tlist
  ]
}
