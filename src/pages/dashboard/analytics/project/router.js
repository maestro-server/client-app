'use strict'
import comp from './project'
import tlist from './list/router'

export default {
  name: 'projects',
  path: 'projects',
  redirect: 'projects/list',
  component: comp,
  children: [
    tlist
  ]
}
