<template>

  <div class="row">
    <div class="col-xs-12">
      <p>You can create relational reports, select each filter of each table.</p>
    </div>

    <div class="col-xs-3">

      <div class="text-center">
        <button class="btn btn-success btn-xs">
          <i class="fa fa-plus-circle" aria-hidden="true"></i> Enable
        </button>

        <i class="fa fa-chevron-right pull-right pivot-point"></i>
      </div>

      <panel class="panel-default mt5">
        <template slot="header">
          <h5 class="text-center"><i class="fa fa-user-o" aria-hidden="true"></i> Clients</h5>
        </template>

        <bs-list class="row"></bs-list>
      </panel>

    </div>


    <div class="col-xs-3">

      <div class="text-center">
        <button class="btn btn-danger btn-xs">
          <i class="fa fa-plus-circle" aria-hidden="true"></i> Disable
        </button>

        <i class="fa fa-chevron-right pull-right pivot-point"></i>
      </div>

      <panel class="panel-primary mt5">
        <template slot="header">
          <h5 class="text-center"><i class="fa fa-briefcase" aria-hidden="true"></i> System</h5>
        </template>

        <bs-list class="row">
          <li class="list-group-item">
            <b>Ipv4_private</b>
            <small>=</small> <bs-label>127.0.0.7</bs-label>
          </li>
          <li class="list-group-item">
            <b>Hostname</b>
            <small>%s%</small> <bs-label>Api</bs-label>
          </li>
        </bs-list>

        <div class="text-center">
          <button class="btn btn-primary btn-xs">
            <i class="fa fa-plus-circle" aria-hidden="true"></i> Filters
          </button>
        </div>
      </panel>

    </div>



    <div class="col-xs-3">

      <div class="text-center">
        <button class="btn btn-danger btn-xs">
          <i class="fa fa-plus-circle" aria-hidden="true"></i> Disable
        </button>

        <i class="fa fa-chevron-right pull-right pivot-point"></i>
      </div>

      <panel class="panel-primary mt5">
        <template slot="header">
          <h5 class="text-center"><i class="fa fa-code" aria-hidden="true"></i> Apps</h5>
        </template>

        <bs-list class="row">
          <li class="list-group-item">
            <b>Ipv4_private</b>
            <small>=</small> <bs-label>127.0.0.7</bs-label>
          </li>
          <li class="list-group-item">
            <b>Hostname</b>
            <small>%s%</small> <bs-label>Api</bs-label>
          </li>
        </bs-list>

        <div class="text-center">
          <button class="btn btn-primary btn-xs">
            <i class="fa fa-plus-circle" aria-hidden="true"></i> Filters
          </button>
        </div>
      </panel>

    </div>

    <div class="col-xs-3">

      <div class="text-center">
        <button class="btn btn-danger btn-xs">
          <i class="fa fa-plus-circle" aria-hidden="true"></i> Disable
        </button>
      </div>

      <panel class="panel-primary mt5">
        <template slot="header">
          <h5 class="text-center"><i class="fa fa-server" aria-hidden="true"></i> Servers</h5>
        </template>

        <bs-list class="row">
          <li class="list-group-item">
            <b>Ipv4_private</b>
            <small>=</small> <bs-label>127.0.0.7</bs-label>
          </li>
          <li class="list-group-item">
            <b>Hostname</b>
            <small>%s%</small> <bs-label>Api</bs-label>
          </li>
        </bs-list>

        <div class="text-center">
          <button class="btn btn-primary btn-xs">
            <i class="fa fa-plus-circle" aria-hidden="true"></i> Filters
          </button>
        </div>
      </panel>
    </div>




  </div>

</template>

<script>
  'use strict'

  import TabCreaterList from 'mixins/tab-creater-list'
  import Modals from 'mixins/modals'
  import Adminer from 'factories/adminer'
  import FectherEntity from 'services/fetchEntity'

  export default {
    mixins: [Modals, TabCreaterList],

    props: {
      label: {default: 'Application'},
      defaultType: {default: 'Application'}
    },

    data: function () {
      return {
        type: "Servers",
        field: null,
        comparer: null,
        filter: null,
        options: {
          tables: []
        }
      }
    },

    methods: {
      updaterEdit() {

      },

      fetchData() {
        FectherEntity(Adminer)({persistence: 'local'})
          .find(this.fetchAdminer, {key: 'application_options'})
      }
    },

    created() {
      this.type = this.defaultType
      this.fetchData()
    }
  }

</script>

<style>
  .pivot-point {
    margin-right: -20px;
    margin-top: 4px;
  }
</style>
