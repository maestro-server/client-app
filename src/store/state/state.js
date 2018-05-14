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

  me: CacheManager({k: 'me_list', persistence: 'local'}).find(['_id', 'email', 'name', 'avatar']),

  spinner: {
    show: false
  },

  cache: {},

  options: {
    'base_url': `${window.location .protocol}//${window.location.host}`,
    'api_url': document.head.querySelector("[name=api_url]").content || 'http://localhost:8888',
    'static_url': document.head.querySelector("[name=static_url]").content || '/upload/',
    'logo_url': document.head.querySelector("[name=logo_url]").content || '/static/imgs/logo300.png',
    'theme': document.head.querySelector("[name=theme]").content || 'theme-lotus',
    'api_timeout': 5000
  }
}
