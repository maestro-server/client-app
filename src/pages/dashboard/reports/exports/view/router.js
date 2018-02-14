'use strict'
import comp from './view'

import home from './home/router'
import table from './table/router'

export default {
  path: 'single/:id',
  component: comp,
  children: [
    home,
    table
  ]
}
