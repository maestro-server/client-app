<template>
  <div class="col-sm-3 col-xs-6">
    <bs-list>
      <li class="list-group-item" v-for="link in links">
        <router-link :to="link.route">
          <i class="fa" :class="link.icon"></i>
          <b>{{link.name}}</b>
        </router-link>
      </li>
    </bs-list>
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
