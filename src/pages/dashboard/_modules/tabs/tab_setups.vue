<template>
  <creater-list :single.sync="single" :basket="value" label="Setup" fielder="false" @update="updaterEdit">

    <template slot="forms">
      <bs-select form-type="horizontal" :options="options.own" v-model="single.name" name="name"
                 label="Service" v-validate.initial="'required'" search></bs-select>

      <bs-input form-type="horizontal" v-model="single.version" name="version" label="Version"></bs-input>
    </template>

    <template slot="view" slot-scope="props">
      {{props.item.name}} <span v-if="props.item.version">-></span>
      <bs-label>{{props.item.version}}</bs-label>
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
