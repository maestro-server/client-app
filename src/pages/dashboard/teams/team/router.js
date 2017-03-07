import comp from './team'
import mcreate from './create/router'
import tlist from './list/router'

export default {
  path: 'team',
  redirect: 'team/list',
  component: comp,
  children: [
    mcreate,
    tlist
  ]
}
