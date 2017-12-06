'use strict'

import comp from './inventory.vue'
import servers from './servers/router'
import applications from './applications/router'
import system from './system/router'
import clients from './clients/router'
import datacenter from './datacenter/router'
import connections from './connections/router'
import settings from './settings/router'
import loadbalances from './loadbalances/router'
import databases from './databases/router'
import brokers from './brokers/router'

import cache from './cache/router'
import serverless from './serverless/router'
import apiGateway from './api-gateway/router'
import cdn from './cdn/router'
import objectStorage from './object-storage/router'
import containersOrchestration from './containers-orchestration/router'
import monitor from './monitor/router'
import logs from './logs/router'
import smtp from './smtp/router'
import serviceDiscovery from './service-discovery/router'
import vpn from './vpn/router'
import dns from './dns/router'
import cicd from './ci-cd/router'
import auth from './auth/router'
import nas from './nas/router'
import repository from './repository/router'
import images from './images/router'
import network from './network/router'
import volumes from './volumes/router'
import snapshot from './snapshot/router'
import flavors from './flavors/router'

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
    connections,
    loadbalances,
    databases,
    brokers,
    cache,
    serverless,
    apiGateway,
    cdn,
    objectStorage,
    containersOrchestration,
    monitor,
    logs,
    smtp,
    serviceDiscovery,
    vpn,
    dns,
    cicd,
    auth,
    repository,
    nas,
    images,
    network,
    volumes,
    snapshot,
    flavors
  ]
}
