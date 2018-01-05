<template>
  <div class="col-sm-3 col-xs-6">
    <bs-list>
      <li class="list-group-item" v-for="item in items">
        <router-link :to="{name: 'system.single', params: { id: item._id }}">
          <b>{{item.name}}</b>
        </router-link>
        <br>

        <template v-if="item.clients" v-for="client in item.clients">
          <router-link :to="{name: 'clients.single', params: { id: client._id }}">
            <small class="info"> {{client.name}} <i class="fa fa-eye"></i></small>
          </router-link>
        </template>
      </li>
    </bs-list>
  </div>
</template>

<script>
  'use strict'

  export default {
    props: {
      items: {}
    }
  }
</script>
