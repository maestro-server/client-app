'use strict'

import _ from 'lodash'
import store from 'src/store'
const api_url = _.get(store.getters, 'get_options.api_url')
export default api_url
