<template>
  <creater-list
    :single.sync="single"
    :basket="value"
    label="Setup"
    fielder="false"
    @update="updaterEdit"
  >
    <template slot="forms">
      <bs-select
        v-model="single.name"
        v-validate.initial="'required'"
        form-type="horizontal"
        :options="options.own"
        name="name"
        label="Service"
        search
      />

      <bs-input
        v-model="single.version"
        form-type="horizontal"
        name="version"
        label="Version"
      />
    </template>

    <template
      slot="view"
      slot-scope="props"
    >
      {{ props.item.name }} <span v-if="props.item.version">-></span>
      <bs-label>{{ props.item.version }}</bs-label>
    </template>


    <template slot="header">
      <router-link :to="{name:'settings'}" class="pull-right" target="_blank">
        Add a new service on the list
      </router-link>
      <p class="col-xs-12 clearfix"></p>
    </template>
  </creater-list>
</template>


<script>
  'use strict'

  import TabCreaterList from 'mixins/tab-creater-list'
  import serviceOptions from 'mixins/services-options'

  export default {
    mixins: [TabCreaterList, serviceOptions],

    data: function () {
      return {
        single: {name: null, version: null},
        options: {
          own: []
        }
      }
    },

    created() {
      this.fetchServicesOptions()
    }
  }

</script>
