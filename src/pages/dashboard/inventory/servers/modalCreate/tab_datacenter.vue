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

    <typeahead form-type="horizontal" name="zone" v-model="value.zone" label="Zone"></typeahead>

    <typeahead form-type="horizontal" name="instance" v-model="value.instance" label="Instance type"></typeahead>


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

    <modal title="Datacenters" effect="fade" v-model="showModalDC" @closed="showModalDC = false" sub-modal small>
      <div class="row">
        <div class="col-xs-12">
          <small>Here, choose which database options you might use during servers creation.</small>
          <form class="col-xs-12">
            <bs-input v-model="datacenter.name" label="Datacenter"
                      placeholder="AWS - OTB, California, Azure"></bs-input>

            <bs-input v-model="datacenter.provider" label="Provider"
                      placeholder="AWS, Google Cloud, Azure"></bs-input>
          </form>

          <a href="#" @click.prevent.stop="showModalZones = true" class="pull-right">I like to create my own zones</a>

          <bs-label type="success pull-right mt10">{{datacenter.zones.length}} zones created</bs-label>
        </div>
      </div>

      <div slot="modal-footer" class="modal-footer">
        <button type="button" class="btn btn-default" @click="showModalDC = false">Cancel</button>
        <button type="button" class="btn btn-primary" @click="actionClick">Add Datacenter</button>
      </div>
    </modal>

    <modal :title="'Zones ' + datacenter.name" effect="fade" v-model="showModalZones" @closed="showModalZones = false"
           sub-modal small>
      <div class="row">
        <div class="col-xs-12">
          <small>I would like to delimit which zones can be used (Can create more than one zone).</small>
          <form class="col-xs-12">
            <bs-input class="mt10" v-model="zone" label="Zone" placeholder="sa-east-1"></bs-input>
          </form>
          <a href="#" @click.prevent.stop="addZones" class="btn btn-primary btn-sm pull-left"><i
            class="fa fa-plus-circle"></i> Zone</a>
        </div>
      </div>

      <div class="well col-xs-12 mt10">
        <ul v-if="datacenter.zones.length > 0" class="list-group">
          <li class="list-group-item" v-for="znc, index in datacenter.zones" :key="index">
            {{znc}}

            <button class="btn btn-danger btn-xs pull-right" @click.prevent="deleteZones(index)"><i
              class="fa fa-trash" aria-hidden="true"></i></button>
          </li>
        </ul>
        <span v-if="datacenter.zones.length <= 0" class="col-xs-12 text-center">None zone</span>
        <bs-label v-if="datacenter.zones.length > 0" type="default">{{datacenter.zones.length}} Zone<span
          v-if="datacenter.zones.length > 1">s</span></bs-label>
      </div>


      <div slot="modal-footer" class="modal-footer">
        <button type="button" class="btn btn-default" @click="clearZones()">Cancel</button>
        <button type="button" class="btn btn-primary" @click="showModalZones = false">Add Zones</button>
      </div>
    </modal>

  </div>
</template>


<script>
  'use strict'

  export default {
    props: {
      options: {default: []},
      serverType: {default: []}
    },

    data: function () {
      return {
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
