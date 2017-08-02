<template>
  <div>
    <div class="clearfix">
      <button class="btn btn-primary btn-xs pull-right" @click.prevent="showModalDC = true"><i
        class="fa fa-plus-circle"></i> Datacenter
      </button>
    </div>

    <div class="mt10 clearfix col-xs-12"></div>

    <bs-select v-if="options.length > 0" form-type="horizontal" :options="options" v-model="datacenter"
               label="Datacenter" placeholder="Select Datacenter" @selected="updateModel"></bs-select>

    <div class="row" v-if="options.length == 0">
      <div class="col-xs-3 text-right">
        <label>Datacenter</label>
      </div>
      <div class="col-xs-9">
        <div class="pull-left">
          <bs-label type="danger">None datacenter record.</bs-label>
          <a href="#">Do you like to create one?</a>
        </div>
      </div>
    </div>

    <div class="col-xs-12 mt10"></div>

    <bs-select form-type="horizontal" :options="datacenter.regions" v-model="model.region"
               label="Region" placeholder="Select Region" @selected="updateModel"></bs-select>

    <bs-select form-type="horizontal" :options="datacenter.zones" v-model="model.zone"
               label="Zones" placeholder="Select Zone" search @selected="updateModel"></bs-select>

    <div class="row mt20">
      <div class="col-xs-3 text-right mt5">
        <label>Type</label>
      </div>
      <div class="col-xs-9">
        <button-group v-model="model.type" type="primary">
          <bs-radio v-for="stc, i in serverType" :key="stc" :selected-value="stc">{{stc}}</bs-radio>
        </button-group>
      </div>
    </div>

    <bs-input class="mt20" form-type="horizontal" label="Instance Type" v-model="model.instance"></bs-input>
    <bs-input class="mt20" form-type="horizontal" label="ID Instance" v-model="model.instance_id"></bs-input>

  </div>
</template>


<script>
  'use strict'

  import Datacenters from 'factories/datacenters'
  import FectherEntity from 'services/fetchEntity'

  export default {
    props: {
      serverType: {}
    },

    data: function () {
      const templateModel = {name: null, zone: null, instance_id:null, instance: null, type: null, region: null};

      return {
        options: [],
        resetModel: templateModel,
        model: templateModel,
        datacenter: {name: null, zones: [], provider: null, region: null},
        showModalDC: false,
        showModalZones: false
      }
    },

    methods: {
      fetchDatacenter (e) {
        const data = _.get(e, 'data.items')
        if(!_.isEmpty(data)) {
          this.model = this.resetModel
          this.options = data.map(item=>({value: item, label: item.name}))
        }
      },

      fetchData: function () {
        FectherEntity(Datacenters)(this)({k: 'datacenter'})
        .find(this.fetchDatacenter)
      },

      updateModel: function() {
        this.model.name = _.get(this, 'datacenter.name')
        this.$emit('update', this.model)
      }
    },

    created () {
      this.fetchData()
    }
  }

</script>
