'use strict';

import CacheManager from 'services/cacheManager'

const TenantManager = {
  set (tn) {
    const { _id } = CacheManager({ k: 'me_list', persistence: 'local' }).find(['_id'])
    CacheManager({ k: _id + '_tenant', persistence: 'local' }).set(tn)
  },

  get () {
    const owner = CacheManager({ k: 'me_list', persistence: 'local' }).find()

    if (owner === undefined) {
      window.location.hash = "/auth/logout"
      return
    }

    const { _id } = owner
    let tenant = CacheManager({ k: _id + '_tenant', persistence: 'local' }).find()

    if (!tenant) { tenant = owner }

    return tenant
  }
};

export default TenantManager;
