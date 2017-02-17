import Components from '../components/vuestrap/index'

function plugin (Vue) {
  if (plugin.installed) return

  for (let key in Components) {
    Vue.component('b' + key, Components[key])
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin)
}

export default plugin
