<template>
  <div class="theme-wine">
    <div class="bg-main">
      <bootue></bootue>
      <router-view></router-view>

      <callback></callback>
      <loader></loader>
    </div>
  </div>
</template>

<script>
  import _ from 'lodash'
  import Maestro from 'factories/maestro'

  import store from 'src/store'

  export default {
    created() {
      new Maestro()
        .get(e => {
          store.dispatch('setOptions', _.get(e, 'data'))
        })
    }
  }

</script>
