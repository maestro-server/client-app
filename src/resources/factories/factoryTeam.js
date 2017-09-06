'use strict'

import Factory from './factory'
import store from 'src/store'

class factoryTeam extends Factory {

  constructor(model={}, route="/projects") {
    super(model, route)


    const tenant = store.getters.get_tenant
    const ifShow = _.get(tenant, 'refs', undefined)

    if(ifShow !== 'users') {
      this.setEntity(`/${tenant.refs}/${tenant._id}${route}`)
    }
  }
}

export default factoryTeam
