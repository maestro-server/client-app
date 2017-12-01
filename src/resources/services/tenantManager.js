'use strict';

import CacheManager from 'services/cacheManager'

const TenantManager = {
  set(tn) {
    const {_id} = CacheManager({k: 'me_list', persistence: 'local'}).find(['_id'])
    CacheManager({k: _id + '_tenant', persistence: 'local'}).set(tn)
  },

  get() {
    const {_id} = CacheManager({k: 'me_list', persistence: 'local'}).find(['_id'])
    return CacheManager({k: _id + '_tenant', persistence: 'local'}).find()
  }
};

export default TenantManager;
