import comp from './teams'
import team from './team/router'
import access from './access/router'
import project from './project/router'

export default {
  path: 'teams',
  redirect: 'teams/team/list',
  component: comp,
  children: [
    team,
    access,
    project
  ]
}
