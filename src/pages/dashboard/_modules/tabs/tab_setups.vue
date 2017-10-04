<template>
  <creater-list :single.sync="single" :basket="value" label="Setup" fielder="false" @update="updaterEdit">

    <template slot="forms">
      <bs-select form-type="horizontal" :options="options" v-model="single.name" name="name"
                 label="Service" v-validate.initial="'required'" search></bs-select>
      <bs-input form-type="horizontal" v-model="single.version" name="version" label="Version"></bs-input>
    </template>

    <template slot="view" scope="props">
      {{props.item.name}} <span v-if="props.item.version">-></span>
      <bs-label>{{props.item.version}}</bs-label>
    </template>

  </creater-list>
</template>


<script>
  'use strict'

  import TabCreaterList from 'mixins/tab-creater-list'

  export default {
    mixins: [TabCreaterList],

    props: {
      options: {}
    },

    data: function () {
      return {
        single: {name: null, version: null}
      }
    }
  }

</script>
