'use strict'

import ComponentsM from './maestro/index'

const Components = Object.assign(ComponentsM)

function plugin (Vue) {
  if (plugin.installed) return

  for (let key in Components) {
    Vue.component(key, Components[key])
  }
}

export default plugin
