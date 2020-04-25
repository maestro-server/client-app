import bootue from './_core/Bootue.vue'

import accordion from './accordion/Accordion.vue'
import alert from './alert/Alert.vue'
import badge from './badges/Badges.vue'
import buttonGroup from './buttongroup/ButtonGroup.vue'
import bsLabel from './label/Label.vue'
import displayer from './displayer/Displayer.vue'
import dropdown from './dropdown/Dropdown.vue'
import bsList from './lists/Lists.vue'
import modal from './modal/Modal.vue'
import navbar from './navbar/Navbar.vue'
import pagination from './pagination/Pagination.vue'
import panel from './panel/Panel.vue'
import spinner from './spinner/Spinner.vue'
import tab from './tab/Tab.vue'
import tabGroup from './tabgroup/TabGroup.vue'
import tabs from './tabs/Tabs.vue'
import toggleButton from './togglebutton/ToggleButton.vue'
import toast from './toast/Toast'
import well from './wells/Wells.vue'

import SpreadForms from './forms/'

let components = {
  bootue,
  accordion,
  alert,
  badge,
  bsLabel,
  bsList,
  buttonGroup,
  displayer,
  dropdown,
  modal,
  navbar,
  pagination,
  panel,
  spinner,
  tab,
  tabGroup,
  tabs,
  toggleButton,
  toast,
  well
}

components = Object.assign(components, SpreadForms)

export default components
