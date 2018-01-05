<template>
  <creater-list :single.sync="single" :basket="value" label="Auth" @update="updaterEdit">

    <template slot="forms">

      <div class="row">
        <div class="col-xs-3 text-right mt5">
          <label>Auth type</label>
        </div>
        <div class="col-xs-9">
          <button-group v-model="single.type" type="primary" v-validate.initial="'required'">
            <bs-radio v-for="atp in options" :key="atp" :selected-value="atp">{{atp}}</bs-radio>
          </button-group>
        </div>
      </div>

      <hr/>

      <bs-input form-type="horizontal" name="name" label="Key name*" v-model="single.name"></bs-input>

      <bs-input class="mt20" form-type="horizontal" label="Username" v-model="single.username"></bs-input>
    </template>

    <template slot="view" slot-scope="props">
      <bs-label>{{props.item.type}}</bs-label>
      {{props.item.username}} <span v-if="props.item.name">({{props.item.name}})</span>
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
        single: {name: null, admin: null, type: null}
      }
    }
  }

</script>
