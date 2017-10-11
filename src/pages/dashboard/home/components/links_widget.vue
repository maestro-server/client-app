<template>
  <div class="col-sm-3 col-xs-6">
    <ul class="list-group">
      <li class="list-group-item" v-for="link in links">
        <router-link :to="link.route">
          <i class="fa" :class="link.icon"></i>
          <b>{{link.name}}</b>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  'use strict'

  export default {
    props: {
      links: {}
    }
  }
</script>
