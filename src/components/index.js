'use strict'

import ComponentsM from './maestro/index'
import ComponentsB from './bootue/index'

const Components = Object.assign(ComponentsM, ComponentsB)

function plugin (Vue) {
  if (plugin.installed) return

  for (const key in Components) {
    Vue.component(key, Components[key])
  }
}

export default plugin
