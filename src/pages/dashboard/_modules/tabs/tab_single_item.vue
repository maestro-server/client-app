<template>
  <creater-list :single.sync="single" :basket="value" :label="label" :fielder="fielder" @update="updaterEdit">

    <template slot="forms">
      <bs-input form-type="horizontal" v-model="single[fielder]" :name="fielder" label="Name"
                v-validate.initial="'required'"></bs-input>
    </template>

    <template slot="view" scope="props">
      {{props.item[fielder]}}
    </template>

  </creater-list>
</template>


<script>
  'use strict'

  import TabCreaterList from 'mixins/tab-creater-list'

  export default {
    mixins: [TabCreaterList],

    props: {
      label: {},
      fielder: {default: 'name', type: String}
    },

    data: function () {
      return {
        single: {[this.fielder]: null}
      }
    }

  }
</script>
