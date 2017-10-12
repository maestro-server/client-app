'use strict'

import CacheManager from 'services/cacheManager'

/**
 * Default init state
 *
 */
export default {
  version: VERSION,

  viewer: {
    title: "Dashboard",
    icon: null,
    subtitle: null
  },

  alert: {
    show: false,
    title: null,
    msg: null,
    type: null
  },

  me: CacheManager({k: 'me_list', persistence: 'local'}).find(['_id', 'email', 'name', 'avatar']),

  tenant: CacheManager({k: 'tenant', persistence: 'local'}).find(),

  spinner: {
    show: false
  },

  cache: {}
}
