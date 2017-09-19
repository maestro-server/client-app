'use strict'

import Factory from './factory'
import acceptTenants from '../libs/acceptableTenants'
import store from 'src/store'

class factoryTeam extends Factory {

  constructor(model={}, route="/me") {
    super(model, route)

    const {refs, _id} = store.getters.get_tenant || {}
    const accept = acceptTenants(refs)
    if(accept && _id) {
      this.setEntity(`${refs}/${_id}/${this.entity}`)
    }
  }
}

export default factoryTeam
