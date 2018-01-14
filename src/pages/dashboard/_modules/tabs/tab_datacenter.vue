<template>
  <div>
    <div class="clearfix">
      <router-link :to="{name: 'datacenter'}" class="btn btn-primary btn-xs pull-right" target="_blank">
        <i class="fa fa-plus-circle"></i> Datacenter
      </router-link>
    </div>

    <div class="mt10 clearfix col-xs-12"></div>

    <bs-select v-if="options.length > 0" :disabled="updated" form-type="horizontal" :options="providers" v-model="value.name"
               label="Datacenter" placeholder="Select Datacenter" @input="updateProvider"
               ref="s_provider"></bs-select>

    <div class="row" v-if="options.length == 0">
      <div class="col-xs-3 text-right">
        <label>Datacenter</label>
      </div>
      <div class="col-xs-9">
        <div class="pull-left">
          <bs-label type="danger">None datacenter record.</bs-label>
          <router-link :to="{name: 'datacenter'}">Do you like to create one?</router-link>
        </div>
      </div>
    </div>

    <div class="col-xs-12 mt10"></div>

    <bs-select form-type="horizontal" :options="regions" v-model="value.region"
               label="Region" placeholder="Select Region" ref="s_regions"></bs-select>

    <bs-select form-type="horizontal" :options="zones" v-model="value.zone"
               label="Zones" placeholder="Select Zone" refs="s_zones"></bs-select>

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

    <bs-input class="mt20" form-type="horizontal" label="Instance Type" v-model="value.instance"
              @input="updateModel"></bs-input>
    <bs-input class="mt20" form-type="horizontal" label="ID Instance" v-model="value.instance_id"
              @input="updateModel"></bs-input>
  </div>
</template>


<script>
  'use strict'
  import _ from 'lodash'
  import Datacenters from 'factories/datacenters'
  import FectherEntity from 'services/fetchEntity'

  export default {
    props: {
      serverType: {}
    },

    data: function () {
      return {
        updated: false,
        options: [],
        value: {_id: null, name: null, zone: null, instance_id: null, instance: null, type: null, region: null},
        providers: [],
        zones: [],
        regions: []
      }
    },


    methods: {
      fetchData: function () {
        FectherEntity(Datacenters)()
          .find(this.fetchDatacenter)
      },

      fetchDatacenter(e) {
        const data = _.get(e, 'data.items')
        if (!_.isEmpty(data)) {
          this.options = data.map(item => ({value: item, label: item.name}))
          this.providers = this.options.map(d => d.label)
        }
      },

      updateProvider: function (val) {
        const dc = _.head(this.options.filter(d => d.label == val))

        this.regions = _.get(dc, 'value.regions', [])
        this.zones = _.get(dc, 'value.zones', [])
        this.value._id = _.get(dc, 'value._id')

        this.updateModel()
      },

      updateModel: function () {
        this.$emit('update', _.pickBy(this.value, _.identity))
      },

      updaterEdit(data) {
        this.updated = _.has(data, 'name')
        this.$set(this, 'value', data || {})
      },

      reset() {
        this.updated = false
        this.value = {}
      }
    },

    created() {
      this.fetchData()
    }
  }

</script>
