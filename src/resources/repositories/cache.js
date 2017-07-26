'use strict';

import _ from 'lodash'
import vuexStorage from './vuexStorage'
import localStorage from './localStorage'



const Cache = ({k, t, p}) => (fn) => {

    const Repository = p ? localStorage : vuexStorage

    const callback = function (result) {
      if(result.status == 200 && !_.isEmpty(result.data)) {

        new Repository(k, t)
                .createStore(_.pick(result, 'data', 'status'));

        fn(result)
      }


    }

    return {
        process (proc) {
          let data = new Repository(k, t)
                        .restoreStore();

          if(_.isEmpty(data)) {
            return proc(callback)
          }

          fn(data)
        }
    };
};

export default Cache;
