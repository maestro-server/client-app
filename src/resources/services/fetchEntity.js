'use strict';

import Cache from '../repositories/cache'


const FetcherData = (Entity) => ({team} = {}) => (opts) => {

  return {
    find (fn, query = {}) {
      const filter = _.merge(query, {team})

      Cache(opts)(fn)
        .process((end) => {
          new Entity(filter)
            .authorization()
            .list(end)
        });
    },

    findOne (fn, _id) {
      const filter = {team}

      Cache(opts)(fn)
        .process((end) => {
          new Entity(filter)
            .authorization()
            .getID(_id, end)
        });
    }
  }

};

export default FetcherData;
