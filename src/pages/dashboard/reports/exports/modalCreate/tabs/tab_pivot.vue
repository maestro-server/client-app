<template>

  <div class="row">
    <div class="col-xs-12">
      <p>You can create relational reports, select each filter of each table.</p>
    </div>

    <div class="col-xs-12" v-for="item, key in submit.filters">

      <div class="mt10">
        <div class="text-left">
          <button class="btn btn-xs" :class="{'btn-success': !item.enabled, 'btn-danger': item.enabled}"
                  @click.prevent="toggleEnable(key)">
            <i class="fa" :class="{'fa-plus-circle': !item.enabled, 'fa-minus-circle': item.enabled}"
               aria-hidden="true"></i>
            {{textEnabled(item.enabled)}}
          </button>
        </div>
      </div>


      <div>
        <div class="col-xs-4 title-padding mt10" :class="{'bg-primary': item.enabled, 'bg-info': !item.enabled}">
          <h5 class="text-center">
            <i aria-hidden="true" class="fa fa-briefcase"></i>
            {{item.title}}
          </h5>
        </div>

        <div class="col-xs-8 mt10">
          <bs-list class="row">
            <li class="list-group-item" v-for="filter, index in item.filters">
              <b>{{filter.field}}</b>
              <small>{{filter.comparer}}</small>
              <bs-label>{{filter.filter}}</bs-label>

              <ul v-if="filter.subfilter">
                <li class="text-wrapper">
                  <b class="primary">{{filter.subfield}}</b> <i>{{filter.comparer}}</i>
                  <span>{{filter.subfilter}}</span>
                </li>
              </ul>

              <a class="fa fa-trash btn btn-danger btn-xs pull-right" @click.stop="delItem(index)"></a>
            </li>

            <li class="list-group-item list-group-item-default" v-if="item.filters.length == 0">
              No Filter
            </li>
          </bs-list>

          <div class="row mnt10">
            <a class="btn btn-primary btn-xs pull-right" @click.stop="sModal(item.title)" v-if="item.enabled">
              <i class="fa fa-plus-circle" aria-hidden="true"></i> Filters
            </a>
          </div>

        </div>

      </div>

      <div class="text-center col-xs-12">
        <i class="fa fa-chevron-down" v-if="item.arrowhidden !== true"></i>
      </div>

    </div>

    <modal title="Add Filter" effect="fade" v-model="showModal" @opened="reset" sub-modal small>

      <div class="row pivot-modal">
        <div class="col-xs-12">
          <report-filter ref="compfilters" @submit="addFilter" @del="delItem"></report-filter>
        </div>

        <div class="col-xs-12">
          <hr>
          <p class="text-center">You can add multiple filter in the same field. Maestro will use AND in multiple
            filters.</p>
        </div>


      </div>

      <div slot="modal-footer" class="modal-footer"></div>

    </modal>
  </div>

</template>

<script>
  'use strict'

  import TabCreaterList from 'mixins/tab-creater-list'
  import Modals from 'mixins/modals'
  import Adminer from 'factories/adminer'
  import FectherEntity from 'services/fetchEntity'
  import reportFilter from '../modules/reportFilter/ReportFilter';

  export default {
    mixins: [Modals, TabCreaterList],

    props: {
      label: {default: 'Application'},
      defaultType: {default: 'Application'}
    },

    components: {
      reportFilter
    },

    data: function () {
      return {
        showModal: false,
        entity: false,
        submit: {
          report: "pivot",
          filters: {
            clients: {
              title: 'Clients',
              icon: 'fa-user-o',
              enabled: true,
              filters: [{"field": "active", "filter": "true", "comparer": "equal", "typ": "boolean"}]
            },
            systems: {
              title: 'System',
              icon: 'fa-briefcase',
              enabled: true,
              filters: [{"field": "active", "filter": "true", "comparer": "equal", "typ": "boolean"}]
            },
            applications: {
              title: 'Applications',
              icon: 'fa-code',
              enabled: true,
              filters: [{"field": "active", "filter": "true", "comparer": "equal", "typ": "boolean"}]
            },
            servers: {
              title: 'Servers',
              icon: 'fa-server',
              enabled: true,
              filters: [{"field": "active", "filter": "true", "comparer": "equal", "typ": "boolean"}],
              arrowhidden: true
            }
          }
        },
        options: {
          tables: false
        }
      }
    },

    methods: {
      textEnabled(enabled) {
        return enabled ? 'Disabled' : 'Enable'
      },

      toggleEnable(key) {
        this.submit.filters[key].enabled = !this.submit.filters[key].enabled

        this.updateEvent()
      },

      sModal(table) {
        if (_.has(this, 'options.tables')) {
          this.entity = table.toLowerCase()

          const items = this.options.tables.filter(data => table === data.name)
          this.$refs.compfilters.updateFilters(_.head(items))

          this.showModal = !this.showModal
        }
      },

      addFilter(picks) {
        if (picks) {
          this.submit.filters[this.entity].filters.push(picks)
        }

        this.updateEvent()
      },

      delItem(index) {
        delete this.submit.filters[this.entity].filters.splice(index, 1)

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
  .pivot-modal {
    min-height: 280px;
  }

  .title-padding {
    padding: 3px 0;
    border-radius: 10px 0px 0 10px;
  }

  .mnt10 {
    margin-top: -10px;
  }
</style>
