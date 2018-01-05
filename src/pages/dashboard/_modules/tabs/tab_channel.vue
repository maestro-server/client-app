<template>
  <creater-list :single.sync="single" :basket="value" label="Contact" @update="updaterEdit">

    <template slot="forms">
      <typeahead
        label="Channel"
        placeholder="Email, Hipchat"
        :data="types"
        v-model="single.channel"
        v-validate.initial="'required'"
        form-type="horizontal"
        :headers="headers"
      ></typeahead>

      <bs-input form-type="horizontal" v-model="single.value" name="value" label="Value"
                v-validate.initial="'required'"></bs-input>
    </template>

    <template slot="view" slot-scope="props">
      <bs-label>{{props.item.channel}}</bs-label>
      - {{props.item.value}}
    </template>

  </creater-list>

</template>


<script>
  'use strict'
  import TabCreaterList from 'mixins/tab-creater-list'
  import headerLogin from 'src/resources/libs/headerAuthorization'

  export default {
    mixins: [TabCreaterList],

    props: {
      types: {}
    },

    data: function () {
      return {
        headers: headerLogin,
        single: {channel: null, value: null}
      }
    }
  }

</script>
