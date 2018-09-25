'use strict'
import comp from './view'

import home from './home/router'
import graph from './graph/router'

export default {
  path: 'single/:id',
  component: comp,
  children: [
    home,
    graph
  ]
}
