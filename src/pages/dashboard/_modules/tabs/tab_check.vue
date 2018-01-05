<template>
  <creater-list :single.sync="single" :basket="value" label="Link" @update="updaterEdit">

    <template slot="forms">
      <bs-select form-type="horizontal" :options="types" v-model="single.key" name="type"
                 label="Type*" v-validate.initial="'required'" :error="makeError('type')"></bs-select>

      <bs-input form-type="horizontal" v-model="single.value" name="value" label="Endpoint*"
                v-validate.initial="'required'"></bs-input>
    </template>

    <template slot="view" slot-scope="props">
      {{props.item.key}} <span v-if="props.item.value">-></span>
      <bs-label>{{props.item.value}}</bs-label>
    </template>

  </creater-list>
</template>


<script>
  'use strict'
  import TabCreaterList from 'mixins/tab-creater-list'

  export default {
    mixins: [TabCreaterList],

    props: {
      types: {}
    },

    data: function () {
      return {
        single: {key: null, value: null}
      }
    }
  }

</script>
