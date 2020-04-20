'use strict'

import factoryStorage from './factoryStorage.js'

import engine from 'store/src/store-engine'
import storages from 'store/storages/localStorage'
import expirePlugin from 'store/plugins/expire'


class LocalStorage extends factoryStorage {

  constructor (key = 'x-access', expires = 86400) {
    const store = engine.createStore([storages], [expirePlugin])
    super(key, store, expires)
  }
}

export default LocalStorage
