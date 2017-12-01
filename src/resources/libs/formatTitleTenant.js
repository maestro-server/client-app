'use strict'

import tenantMananger from 'services/tenantManager'

const format = (ttenant, tsingle) => {
  const tenant = tenantMananger.get()
  const ifShow = _.get(tenant, 'refs', 'users')
  return ifShow !== 'users' ? `${_.get(tenant, 'name')} ${ttenant}` : tsingle
}

export default format
