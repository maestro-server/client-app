'use strict'

import _ from 'lodash'
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
    'api_url': _.get(document.head.querySelector("[name=api_url]"), 'content', 'http://localhost:8888'),
    'analytics_url': _.get(document.head.querySelector("[name=analytics_url]"), 'content', 'http://localhost:9999'),
    'websocket_url': _.get(document.head.querySelector("[name=websocket_url]"), 'content', 'http://localhost:8000'),
    'static_url': _.get(document.head.querySelector("[name=static_url]"), 'content', '/upload/'),
    'logo_url': _.get(document.head.querySelector("[name=logo_url]"), 'content', '/static/imgs/logo300.png'),
    'theme': _.get(document.head.querySelector("[name=theme]"), 'content', 'lotus'),
    'api_timeout': 5000
  }
}
