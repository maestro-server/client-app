<template>
  <div id="app" class="bg-purple">
    <router-view></router-view>

    <callback></callback>
    <loader></loader>

    <notifications group="foo" />
  </div>
</template>
