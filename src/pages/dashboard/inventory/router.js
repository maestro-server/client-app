'use strict'
import comp from './inventory.vue'
import servers from './servers/router'
import applications from './applications/router'
import system from './system/router'
import clients from './clients/router'
import datacenter from './datacenter/router'
import providers from './providers/router'
import settings from './settings/single/router'
import loadbalances from './loadbalances/router'
import databases from './databases/router'
import brokers from './brokers/router'

export default {
  name: 'inventory',
  path: 'inventory',
  redirect: 'inventory/servers',
  component: comp,
  children: [
    servers,
    applications,
    system,
    datacenter,
    clients,
    settings,
    providers,
    loadbalances,
    databases,
    brokers
  ]
}
