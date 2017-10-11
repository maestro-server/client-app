<template>
  <div class="col-sm-3 col-xs-6" v-if="apps">
    <ul class="list-group">
      <li class="list-group-item" v-for="app in apps">
        <router-link :to="{name: 'applications.single', params: { id: app._id }}">
          <b>{{app.name}}</b>
          <span v-if='app.environment'>({{app.environment}})</span>
        </router-link>
        <br>
        <bs-label type='default'>{{app.family}}</bs-label>
        <bs-label type='default'>{{app.cluster}}</bs-label>
        <bs-label type='success'>{{app.provider}}</bs-label>
      </li>
    </ul>
  </div>
</template>

<script>
  'use strict'

  export default {
    props: {
      apps: {}
    }
  }
</script>
