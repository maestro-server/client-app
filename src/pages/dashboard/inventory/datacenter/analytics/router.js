'use strict'
import comp from './view'
import applications from './applications/router'
import servers from './servers/router'

export default {
  path: 'analytics/:id',
  component: comp,
  children: [
    servers,
    applications
  ]
}
