<template>
  <div class="col-sm-3 col-xs-12">
    <bs-list>
      <li
        v-for="server in servers"
        :key="server._id"
        class="list-group-item word-break"
      >
        <router-link :to="{name: 'servers.single', params: { id: server._id }}">
          <b>{{ server.name }}</b> <span v-if="server.os && server.os.base">({{ server.os.base }})</span>
          <span v-if="server.datacenters"> - {{ server.datacenters.name }}</span>
        </router-link>
        <br>
        <div class="f15">
          <bs-label type="default" v-if="server.ipv4_private">{{ server.ipv4_private }}</bs-label>
          <bs-label type="default" v-if="server.ipv4_public">{{ server.ipv4_public }}</bs-label>
          <bs-label type="success" v-if="server.role">{{ server.role }}</bs-label>
          <bs-label type="success" v-if="server.environment">{{ server.environment }}</bs-label>
        </div>
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

