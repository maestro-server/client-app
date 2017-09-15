'use strict';

import _ from 'lodash'
import storage from '../repositories/storage'
import acceptTenants from '../libs/acceptableTenants'


const CacheRequester = (k) => ({time, persistence, force}) => ({refs, _id}={}) => (fn) => {

    const key = acceptTenants(refs) ? `${k}_${_id}` : k

    const callback = function (result) {
      if(result.status == 200 && !_.isEmpty(result.data)) {
        storage({k:key, time, persistence})
          .create(_.pick(result, 'data', 'status'))

        fn(result)
      }
    }

    return {
        process (proc) {
          let data = storage({k:key, time, persistence}).get()

          if(_.isEmpty(data) || force) {
            return proc(callback)
          }

          fn(data)
        },

        remove (proc) {
          storage({k:key, persistence}).delete()

          return proc(fn)
        }
    };
};

export default CacheRequester;
