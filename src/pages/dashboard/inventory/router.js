'use strict'
import comp from './inventory.vue'
import servers from './servers/router'
import applications from './applications/router'
import system from './system/list/router'
import datacenter from './datacenter/list/router'
import settings from './settings/single/router'

export default {
  path: 'inventory',
  redirect: 'inventory/servers',
  component: comp,
  children: [
    servers,
    applications,
    system,
    datacenter,
    settings
  ]
}