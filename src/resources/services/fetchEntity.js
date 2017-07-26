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
    }
  }

};

export default FetcherData;
