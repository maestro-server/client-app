<template>
  <div>
    <div class="clearfix">
      <router-link
        :to="{name: 'datacenter'}"
        class="btn btn-primary btn-xs pull-right"
        target="_blank"
      >
        <i class="fa fa-plus-circle"/> Datacenter
      </router-link>
    </div>

    <div class="mt10 clearfix col-xs-12"/>

    <bs-select
      v-if="options.length > 0"
      ref="s_provider"
      v-model="value.name"
      :disabled="updated"
      form-type="horizontal"
      :options="providers"
      label="Datacenter"
      placnewereholder="Select Datacenter"
      @input="updateProvider"
    />

    <div
      v-if="options.length == 0"
      class="row"
    >
      <div class="col-xs-3 text-right">
        <label>Datacenter</label>
      </div>
      <div class="col-xs-9">
        <div class="pull-left">
          <bs-label type="danger">
            None datacenter record.
          </bs-label>
          <router-link :to="{name: 'datacenter'}" class="pl3">
            Do you like to create one?
          </router-link>
        </div>
      </div>
    </div>

    <div class="col-xs-12 mt10"/>

    <bs-select
      ref="s_regions"
      v-model="value.region"
      form-type="horizontal"
      :options="regions"
      label="Region"
      placeholder="Select Region"
      @input="updateModel"
    />

    <bs-select
      v-model="value.zone"
      form-type="horizontal"
      :options="zones"
      label="Zones"
      placeholder="Select Zone"
      refs="s_zones"
      multiple
      @input="updateModel"
    />
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
        value: {
          _id: null,
          name: null,
          zone: null,
          instance_id: null,
          instance: null,
          type: null,
          region: null,
          provider: null
        },
        providers: [],
        zones: [],
        regions: []
      }
    },

    created () {
      this.fetchData()
    },

    methods: {
      fetchData: function () {
        FectherEntity(Datacenters)()
          .find(this.fetchDatacenter)
      },

      fetchDatacenter (e) {
        const data = _.get(e, 'data.items')
        if (!_.isEmpty(data)) {
          this.options = data.map(item => ({
            value: item,
            label: item.name
          }))
          this.providers = this.options.map(d => d.label)
        }
      },

      updateProvider: function (val) {
        const dc = _.head(this.options.filter(d => d.label == val))

        this.regions = _.get(dc, 'value.regions', [])
        this.zones = _.get(dc, 'value.zones', [])
        this.value._id = _.get(dc, 'value._id')
        this.value.provider = _.get(dc, 'value.provider')

        this.updateModel()
      },

      updateModel: function () {
        this.$emit('update', _.pickBy(this.value, _.identity))
      },

      updaterEdit (data) {
        this.updated = _.has(data, 'name')
        this.$set(this, 'value', data || {})
      },

      reset () {
        this.updated = false
        this.value = {}
      }
    }
  }

</script>
