'use strict'
import comp from './analytics'
import project from './project/router'
import dependencies from './dependencies/router'
import gbussiness from './gbussiness/router'


export default {
  name: 'analytics',
  path: 'analytics',
  redirect: 'analytics/graphs',
  component: comp,
  children: [
    project,
    gbussiness,
    dependencies
  ]
}
