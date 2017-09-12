'use strict';

import _ from 'lodash'
import storage from '../repositories/storage'


const CacheManager = (opts = {}) => {

  return {
    find (filter) {
      const data = storage(opts).get()
      return filter ? _.pick(data, filter) : data
    },

    set (data) {
      return storage(opts).create(data)
    },

    remove () {
      storage(opts).delete()
    },

    clear () {
      storage(opts).clear()
    },

    clearAll () {
      storage({}).clear()
      storage({persistence: 'local'}).clear()
      storage({persistence: 'vuex'}).clear()
    }
  }

};

export default CacheManager;
