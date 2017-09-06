'use strict'

import store from 'src/store'

const format = (ttenant, tsingle) => {
  const tenant = store.getters.get_tenant
  const ifShow = _.get(tenant, 'refs', 'users')
  return ifShow !== 'users' ? `${_.get(tenant, 'name')} ${ttenant}` : tsingle
}

export default format
