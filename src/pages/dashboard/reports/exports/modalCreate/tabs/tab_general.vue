<template>

  <div>

    <p>General reports is a single table if you need to join data, use a pivot type report.</p>

    <div class="col-xs-12">
      <bs-select v-model="submit.component" :options="tables" name="table" label="Component"
                 @input="updateFilters" placeholder="Choose primary component"></bs-select>
      <hr>
    </div>

    <div class="row">
      <div class="col-xs-12">
        <h4>Filters</h4>
      </div>

      <div class="col-xs-5">

        <report-filter ref="compfilters" @submit="addFilter" @del="delItem"></report-filter>

      </div>

      <div class="col-xs-1">
        <i class="fa fa-chevron-right text-center general-point"></i>
      </div>

      <div class="col-xs-6">

        <bs-list>
          <li class="list-group-item list-group-item-warning" v-for="filter, index in submit.filters">
            <b class="primary">{{filter.field}}</b> <i>{{filter.comparer}}</i> <span>{{filter.filter}}</span>

            <ul v-if="filter.subfilter">
              <li class="text-wrapper">
                <b class="primary">{{filter.subfield}}</b> <i>{{filter.comparer}}</i> <span>{{filter.subfilter}}</span>
              </li>
            </ul>

            <div class="text-right">
              <bs-label type="info">{{filter.typ}}</bs-label>
              <a class="fa fa-trash btn btn-danger btn-xs" @click.stop="delItem(index)"></a>
            </div>
          </li>
        </bs-list>

        <div class="pull-right" v-if="submit.filters && submit.filters.length > 0">
          <bs-label type="primary">{{submit.filters.length}}</bs-label>
        </div>

        <well class="pull-right col-xs-12 mt10" v-if="submit.filters.length == 0">
          No filter
        </well>


      </div>
    </div>

    <hr>

    <div>
      <h5>Tips</h5>
      <table class="table table-responsive table-striped">
        <tbody>
        <tr>
          <th>Status</th>
          <td>Used in pontual situation to sign some state. (EX: active, stopped servers)</td>
        </tr>
        <tr>
          <th>Active</th>
          <td>Boolean value used when delete item (in reports you can recover deleted items)</td>
        </tr>
        </tbody>

      </table>
    </div>

  </div>

</template>

<script>
  'use strict'

  import _ from 'lodash'
  import Modals from 'mixins/modals'
  import Adminer from 'factories/adminer'
  import FectherEntity from 'services/fetchEntity'

  import reportFilter from '../modules/reportFilter/ReportFilter';

  export default {
    mixins: [Modals],

    components: {
      reportFilter
    },

    data: function () {
      return {
        submit: {
          report: "general",
          component: 'Servers',
          filters: [{ "field": "active", "filter": "true", "comparer": "equal", "typ": "boolean"}],
        },
        options: {
          tables: false
        }
      }
    },

    computed: {
      tables() {
        if (_.has(this, 'options.tables') && _.isArray(this.options.tables)) {
          return this.options.tables.map(data => data.name)
        }
      }
    },

    methods: {
      updateFilters() {
        if (_.has(this, 'options.tables') && _.isArray(this.options.tables)) {
          const items = this.options.tables.filter(data => this.submit.component === data.name)
          this.$refs.compfilters.updateFilters(_.head(items))

          this.updateEvent()
        }
      },

      addFilter(picks) {
        if(picks) {
          this.submit.filters.push(picks)
        }

        this.updateEvent()
      },

      delItem(index) {
        delete this.submit.filters.splice( index, 1 )

        this.updateEvent()
      },

      updateEvent() {
        this.$emit('update', this.submit)
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

<style lang="scss">
  .general-point {
    margin-top: 57px;
  }

  .text-wrapper {
    overflow-wrap: break-word;

    .italic {
      font-style: italic;
    }
  }
</style>
