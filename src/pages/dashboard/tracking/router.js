'use strict'
import comp from './tracking'
import track from './track/router'

export default {
  name: 'tracking',
  path: 'tracking',
  redirect: 'tracking/track',
  component: comp,
  children: [
    track
  ]
}
