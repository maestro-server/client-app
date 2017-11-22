'use strict'

import _ from 'lodash'
import store from 'src/store'
const base_url = _.get(store.getters, 'get_options.base_url')
export default base_url
