<template>
  <div class="col-sm-3 col-xs-12">
    <bs-list>
      <li v-for="link in links" :key="link.name" class="list-group-item">
        <router-link :to="link.route">
          <i class="fa" :class="link.icon"/>
          <b> {{ link.name }}</b>
        </router-link>
      </li>
    </bs-list>
  </div>
</template>

<script>
"use strict";

export default {
  props: {
    links: {}
  }
};
</script>
