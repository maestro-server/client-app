'use strict'

import Login from 'services/login'

export default [
  {
    "key": "Accept",
    "value": 'application/json'
  },
  {
    "key": "Authorization",
    "value": Login.Authorization()
  }
]
