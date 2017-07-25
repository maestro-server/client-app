<template>
  <div>
    <div class="clearfix">
      <button class="btn btn-primary btn-xs pull-right" @click.prevent="showModalDC = true"><i
        class="fa fa-plus-circle"></i> Datacenter
      </button>
    </div>

    <div class="mt10 clearfix col-xs-12"></div>

    <bs-select v-if="options.length > 0" form-type="horizontal" :options="options" v-model="value.name"
               label="Datacenter"></bs-select>

    <div class="row" v-if="options.length == 0">
      <div class="col-xs-3 text-right">
        <label>Datacenter</label>
      </div>
      <div class="col-xs-9">
        <div class="pull-left">
          <bs-label type="danger">None datacenter record.</bs-label>
          <a href="#" @click.prevent="showModalDC = true">Do you like to create one?</a>
        </div>
      </div>
    </div>

    <div class="col-xs-12 mt10"></div>

    <typeahead form-type="horizontal" name="zone" v-model="value.zone" label="Zone" placeholder="sa-east-1"></typeahead>

    <typeahead form-type="horizontal" name="instance" v-model="value.instance" label="Instance type" placeholder="m3.medium"></typeahead>


    <div class="row mt20">
      <div class="col-xs-3 text-right mt5">
        <label>Type</label>
      </div>
      <div class="col-xs-9">
        <button-group v-model="value.type" type="primary">
          <bs-radio v-for="stc, i in serverType" :key="stc" :selected-value="stc">{{stc}}</bs-radio>
        </button-group>
      </div>
    </div>

    <bs-input class="mt20" form-type="horizontal" label="ID Instance" v-model="value.id"></bs-input>

  </div>
</template>


<script>
  'use strict'

  export default {
    props: {
      serverType: {}
    },

    data: function () {
      return {
        options: [],
        value: {name: null, zone: null, instance: null, type: null},
        datacenter: {name: null, zones: [], provider: null},
        zone: null,
        showModalDC: false,
        showModalZones: false
      }
    },

    methods: {
      addZones() {
        if (this.zone) {
          this.datacenter.zones.push(this.zone)
          this.zone = ''
        }
      },

      deleteZones(key) {
        this.datacenter.zones.splice(key, 1)
      },

      clearZones() {
        this.datacenter.zones = []
        this.showModalZones = false
      },

      actionClick() {

      }
    }
  }

</script>
