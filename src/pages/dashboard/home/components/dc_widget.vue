<template>
  <div class="col-sm-3 col-xs-6">
    <bs-list>
      <li class="list-group-item" v-for="item in items">
        <router-link :to="{name: 'datacenters.single', params: { id: item._id }}">
          <i :class="toLower(item.provider, 'icon-')"></i>
          <b>{{item.name}}</b>
          <bs-label type='success'>{{item.provider}}</bs-label>

        </router-link>
        <br>
        <bs-label type='primary' v-if="item.regions">
          <i class="fa fa-cloud-upload"></i> Regions
           <b>{{item.regions.length}}</b>
        </bs-label>
        <bs-label type='primary' v-if="item.zones">
          <i class="fa fa-bullseye"></i> Zones
          <b>{{item.zones.length}}</b>
        </bs-label>

        <bs-label type="success" class="btn-xs" v-if="item.sucessed === true">Connected</bs-label>
        <bs-label type="warning" class="btn-xs" v-if="item.sucessed === undefined">Disconnected</bs-label>
        <bs-label type="danger" class="btn-xs" v-if="item.sucessed === false">Disconnected</bs-label>
      </li>
    </bs-list>
  </div>
</template>

<script>
  'use strict'

  import _ from 'lodash'

  export default {
    props: {
      items: {}
    },

    methods: {
      toLower(str, app = '') {
        return app + _.kebabCase(str.toLowerCase())
      }
    }
  }
</script>
