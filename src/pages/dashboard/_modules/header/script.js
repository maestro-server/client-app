'use strict'

import mainMenu from './mainMenu/main-menu'
import tenantDropDown from './tenantDropDown/TenantDropDown'

export default {
  components: {
    tenantDropDown,
    mainMenu
  },

  data: function () {
    return {
      title: 'Cloud Inventory',
      subtitle: 'Analytics infrastructure',
      icon: 'fa-th'
    }
  }
}
