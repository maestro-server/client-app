import comp from './project'
import tlist from './list/router'

export default {
  path: 'projects',
  redirect: 'projects/list',
  component: comp,
  children: [
    tlist
  ]
}
