'use strict'

import _ from 'lodash'
import store from 'src/store'
const websocket_url = _.get(store.getters, 'get_options.websocket_url')
export default websocket_url
