<template>
  <creater-list :single.sync="single" :basket="value" label="Tag" fielder="key" @update="updaterEdit">

    <template slot="forms">
      <bs-input form-type="horizontal" v-model="single.key" name="key" label="Key"
                v-validate.initial="'required'"></bs-input>
      <bs-input form-type="horizontal" v-model="single.value" name="value" label="Value"
                v-validate.initial="'required'"></bs-input>
    </template>

    <template slot="view" slot-scope="props">
      <bs-label>{{props.item.key}}</bs-label> - {{props.item.value}}
    </template>

  </creater-list>
</template>


<script>
  'use strict'

  import TabCreaterList from 'mixins/tab-creater-list'

  export default {
    mixins: [TabCreaterList],

    data: function () {
      return {
        single: {key: null, value: null}
      }
    }
  }
</script>
