<template>
  <div class="col-sm-3 col-xs-6">
    <bs-list>
      <li class="list-group-item" v-for="server in servers">
        <router-link :to="{name: 'servers.single', params: { id: server._id }}">
          <b>{{server.hostname}}</b> <span v-if='server.os'>({{server.os.base}})</span>
          <span v-if="server.datacenters"> - {{server.datacenters.name}}</span>
        </router-link>
        <br/>
        <bs-label type='default'>{{server.ipv4_private}}</bs-label>
        <bs-label type='default'>{{server.ipv4_public}}</bs-label>
        <bs-label type='success'>{{server.role}}</bs-label>
        <bs-label type='success'>{{server.environment}}</bs-label>
      </li>
    </bs-list>
  </div>
</template>

<script>
  'use strict'

  export default {
    props: {
      servers: {}
    }
  }
</script>
