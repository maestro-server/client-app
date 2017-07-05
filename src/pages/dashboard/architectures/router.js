'use strict'
import comp from './architectures.vue'
import tlist from './list/router'

export default {
  path: 'architectures',
  redirect: 'architectures/list',
  component: comp,
  children: [
    tlist
  ]
}
