<template>
  <div id="app" class="bg-purple">
    <router-view></router-view>

    <callback></callback>
  </div>
</template>

<script>
import callback from 'components/maestro/callback/Callback.vue'

export default {
  name: 'app',
  components: {callback}
}
</script>
