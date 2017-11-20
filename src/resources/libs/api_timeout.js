'use strict'

import _ from 'lodash'
import store from 'src/store'
const api_timeout = _.get(store.getters, 'get_options.api_timeout')
export default api_timeout
