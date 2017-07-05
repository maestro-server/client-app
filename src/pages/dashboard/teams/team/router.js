'use strict'
import comp from './team'
import tlist from './list/router'

export default {
  path: 'team',
  redirect: 'team/list',
  component: comp,
  children: [
    tlist
  ]
}
