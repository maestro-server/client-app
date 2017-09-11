'use strict';

import CacheRequester from './cacheRequester'
import store from 'src/store'


const FetcherData = (Entity) => (opts) => {

  const tenant = store.getters.get_tenant

  return {
    find (fn, query = {}) {

      CacheRequester(opts)(tenant)(fn)
        .process((end) => {
          new Entity(query)
            .authorization()
            .list(end)
        });
    },

    findOne (fn, _id) {

      CacheRequester(opts)(tenant)(fn)
        .process((end) => {
          new Entity({})
            .authorization()
            .getID(_id, end)
        });
    },

    update (fn, model, path) {
      const key = path || model._id

      CacheRequester(opts)(tenant)(fn)
        .remove((end) => {
          new Entity(model)
            .authorization()
            .patchID(key, end)
        });
    },

    remove (fn, model, path) {
      const key = path || model._id

      CacheRequester(opts)(tenant)(fn)
        .remove((end) => {

          new Entity(model)
            .authorization()
            .deleteID(key, end)
        });
    }
  }

};

export default FetcherData;
