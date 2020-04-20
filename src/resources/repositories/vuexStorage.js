'use strict'

import factoryStorage from './factoryStorage.js'

import engine from 'store/src/store-engine'
import storages from './vuexStorage/vuexStorage'
import expirePlugin from 'store/plugins/expire'


class vuexStorage extends factoryStorage {

  constructor (key = 'x-access') {
    const store = engine.createStore([storages], [expirePlugin])
    super(key, store)
  }

}

export default vuexStorage
