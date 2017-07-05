'use strict'
import ComponentsB from './bootue/index'
import ComponentsM from './maestro/index'

const Components = Object.assign(ComponentsB, ComponentsM)

function plugin (Vue) {
  if (plugin.installed) return

  for (let key in Components) {
    Vue.component(key, Components[key])
  }
}

export default plugin
