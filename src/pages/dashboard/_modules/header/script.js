'use strict'

import mainMenu from './mainMenu/main-menu'
import tenantDropDown from './tenantDropDown/TenantDropDown'
import settingDropDown from './settingDropDown/SettingDropDown'

export default {
  components: {
    tenantDropDown,
    settingDropDown,
    mainMenu
  },

  data: function () {
    return {
      title: 'Cloud Inventory',
      subtitle: 'Database of all yours infra',
      icon: 'fa-th'
    }
  }
}
