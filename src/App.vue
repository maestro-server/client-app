<template>
  <div id="app" class="bg-purple">
    <bootue></bootue>
    <router-view></router-view>

    <callback></callback>
    <loader></loader>
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
