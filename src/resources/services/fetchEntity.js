'use strict';

import _ from 'lodash'
import CacheRequester from './cacheRequester'
import tenantMananger from 'services/tenantManager'

const queryBuilder = (or, rr, kr) => {
  if (rr) {
    return `${or}_${rr}_${kr}`
  }
  return or
}

const FetcherData = (Entity) => (opts = {}, headers = {}) => {

  const tenant = tenantMananger.get()
  const k = _.get(Entity, 'ename')
  const {path} = opts

  return {
    find (fn, query = {}) {
      const queryRer =_.reduce(query, queryBuilder, '') || 'list'
      const fk = `${k}_${queryRer}`

      CacheRequester(fk)(opts)(tenant)(fn)
        .process((end) => {
          new Entity(query, path)
            .authorization()
            .headers(headers)
            .get(end)
        });
    },

    findOne (fn, _id) {
      const fk = `${k}_${_id}`

      CacheRequester(fk)(opts)(tenant)(fn)
        .process((end) => {
          new Entity({}, path)
            .authorization()
            .headers(headers)
            .getID(_id, end)
        });
    },

    create (fn, model, kcache = 'list') {
      const fk = `${k}_${kcache}`

      CacheRequester(fk)(opts)(tenant)(fn)
        .remove((end) => {
          new Entity(model, path)
            .authorization()
            .headers(headers)
            .create(end)
        })
    },

    update (fn, model, gid) {
      const key = gid || model._id
      const fk = `${k}_${key}`

      CacheRequester(fk)(opts)(tenant)(fn)
        .remove((end) => {
          new Entity(model, path)
            .authorization()
            .headers(headers)
            .updateID(key, end)
        });

      CacheRequester(fk)(opts)(tenant)(fn)
    },

    patch (fn, model, gid) {
      const key = gid || model._id
      const fk = `${k}_${key}`

      CacheRequester(fk)(opts)(tenant)(fn)
        .remove((end) => {
          new Entity(model, path)
            .authorization()
            .patchID(key, end)
        });
    },

    remove (fn, model, gid) {
      const key = gid || model._id
      const list_k = `${k}_list`
      const fk = `${k}_${key}`

      CacheRequester(fk)(opts)(tenant)(fn)
        .remove((end) => {

          new Entity(model, path)
            .authorization()
            .deleteID(key, end)
        });

      CacheRequester(list_k)(opts)(tenant)(fn)
        .remove(end=>end);
    }
  }

};

export default FetcherData;
