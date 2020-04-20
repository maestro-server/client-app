'use strict'

import _ from 'lodash'
import store from 'src/store'
const analytics_url = _.get(store.getters, 'get_options.analytics_url')
export default analytics_url
