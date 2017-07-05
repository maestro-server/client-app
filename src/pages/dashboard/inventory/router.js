'use strict'
import comp from './inventory.vue'
import servers from './servers/list/router'
import applications from './applications/list/router'
import system from './system/list/router'

export default {
  path: 'inventory',
  redirect: 'inventory/servers',
  component: comp,
  children: [
    servers,
    applications,
    system
  ]
}
