<template>

  <creater-list :single.sync="single" :basket="value" label="Deploy" fielder="key" @update="updaterEdit">

    <template slot="forms">
      <bs-select form-type="horizontal" :options="types" v-model="single.type" name="type"
                 label="Type*" v-validate.initial="'required'" :error="makeError('type')"></bs-select>

      <bs-input form-type="horizontal" v-model="single.provider" name="provider" label="Provider"></bs-input>

      <bs-input type="textarea" class="mt20" form-type="horizontal" name="description" label="Notes" v-model="single.notes"></bs-input>
    </template>

    <template slot="view" slot-scope="props">
      {{props.item.type}} <bs-label>{{props.item.provider}}</bs-label>
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
        single: {type: null, provider: null, notes:null}
      }
    }
  }
</script>
