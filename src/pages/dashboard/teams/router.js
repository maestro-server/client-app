import comp from './teams'
import team from './team/router'
import project from './project/router'

export default {
  path: 'teams',
  redirect: 'teams/team/list',
  component: comp,
  children: [
    team,
    project
  ]
}
