'use strict';

import CacheRequester from './cacheRequester'


const FetcherData = (Entity) => ({team} = {}) => (opts) => {

  return {
    find (fn, query = {}) {
      const filter = _.merge(query, {team})

      CacheRequester(opts)(fn)
        .process((end) => {
          new Entity(filter)
            .authorization()
            .list(end)
        });
    },

    findOne (fn, _id) {
      const filter = {team}

      CacheRequester(opts)(fn)
        .process((end) => {
          new Entity(filter)
            .authorization()
            .getID(_id, end)
        });
    },

    update (fn, model, path) {
      const key = path || model._id

      CacheRequester(opts)(fn)
        .remove((end) => {
          new Entity(model)
            .authorization()
            .patchID(key, end)
        });
    },

    remove (fn, model, path) {
      const key = path || model._id

      CacheRequester(opts)(fn)
        .remove((end) => {

          new Entity(model)
            .authorization()
            .deleteID(key, end)
        });
    }
  }

};

export default FetcherData;
