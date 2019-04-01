<template>
  <div class="col-sm-3 col-xs-12">
    <bs-list>
      <li v-for="item in items" :key="item._id" class="list-group-item">
        <router-link :to="{name: 'datacenters.single', params: { id: item._id }}">
          <i :class="toLower(item.provider, 'icon-')"/>
          <b>{{ item.name }}</b>
          <bs-label type="success">{{ item.provider }}</bs-label>
        </router-link>
        <br>
        <bs-label v-if="item.regions" type="primary">
          <i class="fa fa-cloud-upload"/> Regions
          <b>{{ item.regions.length }}</b>
        </bs-label>
        <bs-label v-if="item.zones" type="primary">
          <i class="fa fa-bullseye"/> Zones
          <b>{{ item.zones.length }}</b>
        </bs-label>

        <bs-label v-if="item.sucessed === true" type="success" class="btn-xs">Connected</bs-label>
        <bs-label v-if="item.sucessed === undefined" type="warning" class="btn-xs">Disconnected</bs-label>
        <bs-label v-if="item.sucessed === false" type="danger" class="btn-xs">Disconnected</bs-label>
      </li>
    </bs-list>
  </div>
</template>

<script>
"use strict";

import _ from "lodash";

export default {
  props: {
    items: {}
  },

  methods: {
    toLower(str, app = "") {
      return app + _.kebabCase(str.toLowerCase());
    }
  }
};
</script>
