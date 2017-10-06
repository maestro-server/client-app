<template>
  <div>
    <b>{{data.hostname}}</b> <span v-if='data.os'>({{data.os.base}})</span>
    <span v-if="data.datacenters"> - {{data.datacenters.name}}</span>
    <router-link :to="{name: 'servers.single', params: { id: data._id }}"><i class="fa  fa-eye" aria-hidden="true"></i></router-link>
    <br/>
    <bs-label type='default'>{{data.ipv4_private}}</bs-label>
    <bs-label type='default'>{{data.ipv4_public}}</bs-label>
    <bs-label type='success'>{{data.role}}</bs-label>
    <bs-label type='success'>{{data.environment}}</bs-label>

    <div class="pull-right" v-if="provider && !hidden">
      <button class="btn btn-primary btn-xs" @click.prevent="event('manage', data)"><i
        class="fa  fa-cog" aria-hidden="true"></i> Manage DB (config, role)</button>
    </div>
  </div>
</template>


<script>
  'use strict'

  export default {
    props: {
      provider: {},
      data: {},
      hidden: {type: Boolean, default: false}
    },

    methods: {
      event(emitter, item = null) {
        this.$emit(emitter, item)
      }
    }
  }

</script>
