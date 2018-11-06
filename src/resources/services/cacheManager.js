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

    clearReg(search) {
      storage(opts).each((vl, ky) => {
        const regex = new RegExp(`${search}`);

        if(regex.test(ky)) {
          const topts = _.assign(opts, {k: ky})
          storage(topts).delete()
        }
      });
    },

    clearAll () {
      storage({}).clear()
      storage({persistence: 'local'}).clear()
      storage({persistence: 'vuex'}).clear()
    }
  }

};

export default CacheManager;
