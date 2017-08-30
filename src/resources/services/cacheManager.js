'use strict';

import storage from '../repositories/storage'


const CacheManager = (opts) => {

  return {
    find () {
      return storage(opts).get()
    },

    set (data) {
      return storage(opts).create(data)
    },

    remove () {
      storage(opts).delete()
    }
  }

};

export default CacheManager;
