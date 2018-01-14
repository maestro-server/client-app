<template>

  <div>

    <p>General reports is a single table if you need to join data, use a pivot type report.</p>

    <div class="col-xs-12">
      <bs-select v-model="type" :options="tables" name="table" label="Component" @input="updateFilters"></bs-select>

      <hr>
    </div>

    <div class="row">
      <div class="col-xs-12">
        <h4>Filters</h4>
      </div>

      <div class="col-xs-4">
        <div class="col-xs-12">
          <bs-select v-model="field" :options="options.filters" name="field" placeholder="Field"></bs-select>
          <bs-select v-model="comparer" :options="options.comparer" name="comparer" placeholder="Equal"></bs-select>
          <bs-input v-model="filter" name="filter" placeholder="Value"></bs-input>
        </div>

        <button class="btn btn-primary btn-sm" @click.stop.prevent="addFilter">
          <i class="fa fa-plus-circle" aria-hidden="true"></i> Add Filters
        </button>
      </div>

      <div class="col-xs-1">
        <i class="fa fa-chevron-right text-center general-point"></i>
      </div>

      <div class="col-xs-7">

        <bs-list>
          <li class="list-group-item" v-for="filter in filters">
            <b>{{filter.field}}</b> -> <span>{{filter.value}}</span>
            <small class="pull-right">{{filter.type}}</small>
          </li>
        </bs-list>

      </div>
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

    data: function () {
      return {
        type: "Servers",
        field: null,
        comparer: null,
        filter: null,
        filters: [],
        options: {
          tables: false,
          filters: [],
          comparer: ['equal', 'contain', 'not contain']
        }
      }
    },

    computed: {
      tables () {
        if(this.options.tables) {
          return this.options.tables.map(data=>data.name)
        }
      }
    },

    methods: {
      updateFilters() {
        this.field = ""
        this.filter = ""
        const items = this.options.tables.filter(data=>this.type === data.name);
        this.options.filters = _.head(items).filters.map(e=>e.key)
      },

      addFilter() {

      },

      updaterEdit() {

      },

      fetchData() {
        FectherEntity(Adminer)({persistence: 'local'})
          .find(this.fetchAdminer, {key: 'reports_options'})
      }
    },

    created() {
      this.fetchData()
    }
  }

</script>

<style>
  .general-point {
    margin-top: 57px;
  }
</style>
