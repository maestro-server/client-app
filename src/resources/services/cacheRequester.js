'use strict';

import _ from 'lodash'
import storage from '../repositories/storage'


const CacheRequester = ({k, time, persistence, force}) => (fn) => {

    const callback = function (result) {
      if(result.status == 200 && !_.isEmpty(result.data)) {

        storage({k, time, persistence})
          .create(_.pick(result, 'data', 'status'))

        fn(result)
      }
    }

    return {
        process (proc) {
          let data = storage({k, time, persistence}).get()

          if(_.isEmpty(data) || force) {
            return proc(callback)
          }

          fn(data)
        },

        remove (proc) {
          storage({k, persistence}).delete()

          return proc(fn)
        }
    };
};

export default CacheRequester;
