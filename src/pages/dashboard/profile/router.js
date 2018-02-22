'use strict'
import comp from './settings'
import accdelete from './delete/router'
import profile from './settings/router'

export default {
  name: 'profile',
  path: 'profile',
  redirect: 'profile/settings',
  component: comp,
  children: [
    accdelete,
    profile
  ]
}
