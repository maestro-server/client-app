import comp from './applications'
import tlist from './list/router'

export default {
  path: 'applications',
  redirect: 'applications/list',
  component: comp,
  children: [
    tlist
  ]
}
