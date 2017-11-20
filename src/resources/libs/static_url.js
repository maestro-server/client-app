'use strict'

import _ from 'lodash'
import store from 'src/store'
const static_url = _.get(store.getters, 'get_options.static_url')
export default static_url
