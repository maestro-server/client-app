'use strict'

import FactoryTenant from './factoryTenant'
import analytics_url from 'src/resources/libs/analytics_url'

class AnalyticsFront extends FactoryTenant {
  constructor(model = {}, path='', tenant = false) {
    super(model, "graphs" + path, tenant)
  }

  getUrl(path=analytics_url) {
    return `${path}/${this.entity}`
  }
}

export default AnalyticsFront
