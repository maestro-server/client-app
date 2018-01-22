<template>

  <div class="row">
    <div class="col-xs-12">
      <p>You can create relational reports, select each filter of each table.</p>
    </div>

    <div class="col-xs-3" v-for="item, key in filters">

      <div class="text-center">
        <button class="btn btn-xs" :class="{'btn-success': !item.enabled, 'btn-danger': item.enabled}"
                @click.prevent="toggleEnable(key)">
          <i class="fa" :class="{'fa-plus-circle': !item.enabled, 'fa-minus-circle': item.enabled}"
             aria-hidden="true"></i>
          {{textEnabled(item.enabled)}}
        </button>

        <i class="fa fa-chevron-right pull-right pivot-point" v-if="item.arrowhidden !== true"></i>
      </div>

      <panel class="panel-default mt5" :class="{'panel-primary': item.enabled}">
        <template slot="header">
          <h5 class="text-center"><i class="fa" :class="item.icon" aria-hidden="true"></i> {{item.title}}</h5>
        </template>

        <div v-if="item.enabled">
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
            </li>
          </bs-list>

          <div class="text-center">
            <button class="btn btn-primary btn-xs">
              <i class="fa fa-plus-circle" aria-hidden="true"></i> Filters
            </button>
          </div>
        </div>
      </panel>

    </div>
  </div>

</template>

<script>
  'use strict'

  import TabCreaterList from 'mixins/tab-creater-list'
  import Modals from 'mixins/modals'

  export default {
    mixins: [Modals, TabCreaterList],

    props: {
      label: {default: 'Application'},
      defaultType: {default: 'Application'}
    },

    data: function () {
      return {
        filters: {
          clients: {
            title: 'Clients',
            icon: 'fa-user-o',
            enabled: true,
            filters: []
          },
          system: {
            title: 'System',
            icon: 'fa-briefcase',
            enabled: false,
            filters: []
          },
          apps: {
            title: 'Apps',
            icon: 'fa-code',
            enabled: false,
            filters: []
          },
          server: {
            title: 'Servers',
            icon: 'fa-server',
            enabled: false,
            filters: [],
            arrowhidden: true
          }
        }
      }
    },

    methods: {
      textEnabled(enabled) {
        return enabled ? 'Disabled' : 'Enable'
      },

      toggleEnable(key) {
        this.filters[key].enabled = !this.filters[key].enabled
      }
    }
  }

</script>

<style>
  .pivot-point {
    margin-right: -20px;
    margin-top: 4px;
  }
</style>
