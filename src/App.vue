<template>
  <div id="app" class="bg-purple">
    <router-view></router-view>

    <callback></callback>
    <loader></loader>

    <notifications group="foo" />
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
          console.log(e)
          store.dispatch('setOptions', _.get(e, 'data'))
        })
    }
  }

</script>
