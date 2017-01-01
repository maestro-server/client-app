<template>
  <div id="app" class="bg-purple">
    <router-view></router-view>

    <callback></callback>

    <spinner ref="spinner" global v-model="spinner" size="lg" fixed text="I will close in 2 secs"></spinner>
  </div>
</template>

<script>
export default {
  name: 'app',

  data () {
      return {
    spinner: false
      } }
}
</script>
