<template>
  <div class="col-sm-3 col-xs-12">
    <bs-list>
      <li v-for="app in apps" :key="app._id" class="list-group-item">
        <router-link :to="{name: 'application.single', params: { id: app._id }}">
          <b>{{ app.name }}</b>
          <span v-if="app.environment">({{ app.environment }})</span>
        </router-link>
        <br>
        <bs-label type="default">{{ app.family }}</bs-label>
        <bs-label type="default">{{ app.cluster }}</bs-label>
        <bs-label type="success">{{ app.provider }}</bs-label>
      </li>
    </bs-list>
  </div>
</template>

<script>
"use strict";

export default {
  props: {
    apps: {}
  }
};
</script>
