'use strict';

import _ from 'lodash'
import storage from '../repositories/storage'


const CacheManager = (opts = {}) => {
  const prefix = _.get(opts, 'prefix', false)

  if(prefix === true) {
    const {_id} = CacheManager({k: 'me_list', persistence: 'local'}).find(['_id'])

    if(_id) {
      const {k} = opts
      _.assign(opts, {k: _id + '_' + k})
    }
  }

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
