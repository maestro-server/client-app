'use strict'
import header from './_modules/header/header'
import footer from './_modules/footer/footer'
import titlePage from './_modules/titlePage/title-page'
import { WSBus } from 'src/resources/websocket/ws.js'


export default {
  components: {
    'dashboard-header': header,
    'dashboard-footer': footer,
    'dashboard-title-page': titlePage
  },

  created () {
    WSBus.connect();
  }
}
