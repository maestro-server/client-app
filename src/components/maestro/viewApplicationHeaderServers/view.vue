<template>
  <div>
    <b>{{ data.name }}</b>
    <span v-if="data.os && data.os.base">({{ data.os.base }})</span>
    <span v-if="data.datacenters">- {{ data.datacenters.name }}</span>
    <router-link :to="{name: 'servers.single', params: { id: data._id }}">
      <i class="fa fa-eye" aria-hidden="true"/>
    </router-link>
    <br>
    <bs-label type="default">{{ data.ipv4_private }}</bs-label>

    <bs-label type="default">{{ data.ipv4_public }}</bs-label>
    <bs-label type="success">{{ data.role }}</bs-label>
    <bs-label type="success">{{ data.environment }}</bs-label>

    <div v-if="provider && !hidden" class="pull-right">
      <button class="btn btn-primary btn-xs" @click.prevent="event('manage', data)">
        <i class="fa fa-cog" aria-hidden="true"/> Manage DB (config, role)
      </button>
    </div>
  </div>
</template>


<script>
"use strict";

export default {
  props: {
    provider: {},
    data: {},
    hidden: { type: Boolean, default: false }
  },

  methods: {
    event (emitter, item = null) {
      this.$emit(emitter, item);
    }
  }
};
</script>
