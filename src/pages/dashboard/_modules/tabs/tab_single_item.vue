<template>
  <creater-list :single.sync="single" :basket="value" :label="label" fielder="name" @update="updaterEdit">

    <template slot="forms">
      <bs-input form-type="horizontal" v-model="single.name" name="name" label="Name"
                v-validate.initial="'required'"></bs-input>
    </template>

    <template slot="view" scope="props">
      {{props.item.name}}
    </template>

  </creater-list>
</template>


<script>
  'use strict'

  import TabCreaterList from 'mixins/tab-creater-list'

  export default {
    mixins: [TabCreaterList],

    props: {
      label: {}
    },

    data: function () {
      return {
        single: {name: null}
      }
    }

  }
</script>
