'use strict'
import comp from './accessManager'
import tlist from './list/router'

export default {
  name: 'access_manager',
  path: 'access-manager',
  redirect: 'access-manager/list',
  component: comp,
  children: [
    tlist
  ]
}
