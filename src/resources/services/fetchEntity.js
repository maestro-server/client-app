'use strict';

import _ from 'lodash'
import CacheRequester from './cacheRequester'
import tenantMananger from 'services/tenantManager'

const FetcherData = (Entity) => (opts = {}) => {

  const tenant = tenantMananger.get()
  const k = _.get(Entity, 'name').toLowerCase()

  return {
    find (fn, query = {}) {
      const queryRer =_.reduce(query, (or, rr, kr)=>`${or}_${rr}_${kr}`, '') || 'list'
      const fk = `${k}_${queryRer}`

      CacheRequester(fk)(opts)(tenant)(fn)
        .process((end) => {
          new Entity(query)
            .authorization()
            .get(end)
        });
    },

    findOne (fn, _id) {
      const fk = `${k}_${_id}`

      CacheRequester(fk)(opts)(tenant)(fn)
        .process((end) => {
          new Entity({})
            .authorization()
            .getID(_id, end)
        });
    },

    create (fn, model) {

      CacheRequester(k)(opts)(tenant)(fn)
        .remove((end) => {
          new Entity(model)
            .authorization()
            .create(end)
        })
    },

    update (fn, model, path) {
      const key = path || model._id
      const fk = `${k}_${key}`

      CacheRequester(fk)(opts)(tenant)(fn)
        .remove((end) => {
          new Entity(model)
            .authorization()
            .updateID(key, end)
        });

      CacheRequester(fk)(opts)(tenant)(fn)
    },

    patch (fn, model, path) {
      const key = path || model._id
      const fk = `${k}_${key}`

      CacheRequester(fk)(opts)(tenant)(fn)
        .remove((end) => {
          new Entity(model)
            .authorization()
            .patchID(key, end)
        });
    },

    remove (fn, model, path) {
      const key = path || model._id
      const list_k = `${k}_list`
      const fk = `${k}_${key}`

      CacheRequester(fk)(opts)(tenant)(fn)
        .remove((end) => {

          new Entity(model)
            .authorization()
            .deleteID(key, end)
        });

      CacheRequester(list_k)(opts)(tenant)(fn)
        .remove(end=>end);
    }
  }

};

export default FetcherData;
