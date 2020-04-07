'use strict'
import comp from './info'
import about from './about/router'

export default {
  name: 'info',
  path: 'info',
  redirect: 'info/about',
  component: comp,
  children: [
    about
  ]
}
