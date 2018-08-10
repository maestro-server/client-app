'use strict'
import comp from './analytics'
import project from './project/router'
import gbussiness from './gbussiness/router'


export default {
  name: 'analytics',
  path: 'analytics',
  redirect: 'analytics/graph-bussiness',
  component: comp,
  children: [
    project,
    gbussiness
  ]
}
