<template>
  <div :class="theme">
    <div class="bg-main">
      <router-view />

      <callback />
      <loader />
    </div>

    <bootue />
  </div>
</template>

<script>
  import _ from 'lodash'
  import Maestro from 'factories/maestro'

  import store from 'src/store'

  export default {
    computed: {
      theme() {
        return 'theme-' + _.get(store.getters, 'get_options.theme')
      }
    },

    created() {
      new Maestro()
        .get(e => {
          store.dispatch('setOptions', _.get(e, 'data'))
        })
    }
  }
</script>
