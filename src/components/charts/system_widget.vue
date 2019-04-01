<template>
  <div class="col-sm-3 col-xs-12">
    <bs-list>
      <li v-for="item in items" :key="item._id" class="list-group-item">
        <router-link :to="{name: 'system.single', params: { id: item._id }}">
          <b>{{ item.name }}</b>
        </router-link>
        <br>

        <span v-for="client in item.clients" :key="client._id">
          <router-link
            :to="{name: 'clients.single', params: { id: client._id }}"
            v-if="item.clients"
          >
            <small class="info">
              {{ client.name }}
              <i class="fa fa-eye"/>
            </small>
          </router-link>
        </span>
      </li>
    </bs-list>
  </div>
</template>

<script>
"use strict";

export default {
  props: {
    items: {}
  }
};
</script>
