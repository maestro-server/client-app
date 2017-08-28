'use strict';

import _ from 'lodash'



const Cache = ({k, time, persistence, force}) => (fn) => {

    const repositoryP = persistence || 'vuex'
    const Repository = require(`./${repositoryP}Storage`).default

    const callback = function (result) {
      if(result.status == 200 && !_.isEmpty(result.data)) {

        new Repository(k)
                .createStore(_.pick(result, 'data', 'status'), time);

        fn(result)
      }
    }

    return {
        process (proc) {
          let data = new Repository(k, time)
                        .restoreStore();

          if(_.isEmpty(data) || force) {
            return proc(callback)
          }

          fn(data)
        },

        remove () {
          new Repository(k)
                    .deleteStore();

          return proc(callback)
        }
    };
};

export default Cache;
