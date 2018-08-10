'use strict'
import comp from './gbussiness'
import tlist from './list/router'

export default {
  name: 'graph-bussiness',
  path: 'graph-bussiness',
  redirect: 'graph-bussiness/list',
  component: comp,
  children: [
    tlist
  ]
}
