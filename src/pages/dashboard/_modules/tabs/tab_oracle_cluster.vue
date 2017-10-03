<template>

  <div>
    <bs-select form-type="horizontal" :options="options.cluster" v-model="cluster.type"
               name="cluster" label="Cluster*" v-validate.initial="'required'" placeholder="This DB have any type of cluster?"
               :error="makeError('cluster')"></bs-select>

    <bs-input class="mt20" form-type="horizontal" name="crs_version" label="CRS Version" v-model="cluster.crs_version"></bs-input>

    <creater-list :basket="value" :label="label" :showAddBtn="false" @update="updaterEdit">
      <template slot="forms">
        <hr>
        <p class="col-xs-12">Select all servers have used in database</p>

        <div class="col-xs-6">
          <typeahead label="Search by Hostname"
                     placeholder="back0100"
                     :async="URL"
                     async-key="items"
                     :onSearch="requestSearch"
                     :template="template"
                     :on-hit="onHit"
                     class="col-xs-12"
          ></typeahead>
        </div>

        <div class="col-xs-6">
          <typeahead label="Search by Private IP" placeholder="10.150.0.0"
                     :async="URL"
                     async-key="items"
                     :onSearch="requestIpSearch"
                     :template="template"
                     :on-hit="onHit"
                     class="col-xs-12"
          ></typeahead>
        </div>

        <div class="col-xs-12">
          <bs-checkbox class="small pull-right" v-model="filter">Show only server with role Database</bs-checkbox>
        </div>


      </template>

      <template slot="view" scope="props">
        <div class="row">
          <div class="col-xs-12">
            <b class="text-capitalize">{{props.item.hostname}}</b>
            <span v-if='props.item.os'>({{props.item.os.base}})</span>
            <span v-if='props.item.datacenters'> - {{props.item.datacenters.name}}</span>
            <bs-label type='default'>{{props.item.ipv4_private}}</bs-label>
            <bs-label type='default'>{{props.item.ipv4_public}}</bs-label>
            <bs-label type='success'>{{props.item.role}}</bs-label>
            <bs-label type='success'>{{props.item.environment}}</bs-label>

            <form class="form-horizontal">
              <bs-input class="mt20" form-type="horizontal" name="name" label="DB Name*"></bs-input>

              <template v-if="!asm">
                <bs-select class="mt20" form-type="horizontal" :options="options.storage_types"
                           name="storage_type" label="Storage Type*" placeholder="How manage your storage?"></bs-select>

                <typeahead label="ASM DB"
                           :async="URL_DB"
                           async-key="items"
                           :onSearch="requestASMdb"
                           :template="template_db"
                           form-type="horizontal"
                           :on-hit="onHit"
                ></typeahead>
              </template>
            </form>


          </div>
        </div>

        <div class="clearfix"></div>

      </template>

    </creater-list>
  </div>

</template>

<script>
  'use strict'

  import TabCreaterList from 'mixins/tab-creater-list'
  import Servers from 'factories/servers'
  import Applications from 'factories/applications'

  export default {
    mixins: [TabCreaterList],

    props: {
      options: {},
      asm: {default: false},
      label: {default: 'Server'}
    },

    data: function () {
      return {
        filter: true,
        cluster: {type: 'Single Instance', crs_version: null, items: []},
        URL: `${new Servers().getUrl()}?query=`,
        URL_DB: `${new Applications().getUrl()}?query=`,
        template: "<b>{{item.hostname}}</b> <span v-if='item.os'>({{item.os.base}})</span> - <span v-if='item.datacenters'>{{item.datacenters.name}}</span><br/> " +
        "<h5 class='ft15'><bs-label type='default'>{{item.ipv4_private}}</bs-label> <bs-label type='default'>{{item.ipv4_public}}</bs-label> <bs-label type='success'>{{item.role}}</bs-label> <bs-label type='success'>{{item.environment}}</bs-label></h5>",
        template_db: "<b>{{item.name}}</b> <span v-if='item.provider'>({{item.provider}})</span><br/><h5 class='ft15'><bs-label type='success'>{{item.environment}}</bs-label></h5>"
      }
    },

    methods: {
      requestSearch(async, val, key = 'hostname', force=this.filter, type='Database') {
        const role = force ? `, "role":"${type}"` : ''
        return `${async}%7B"${key}":"${val}"${role}%7D`
      },

      requestIpSearch(async, val) {
        return this.requestSearch(async, val, 'ipv4_private')
      },

      requestASMdb(async, val) {
        console.log(val)
        return this.requestSearch(async, val, 'name', false)
      },

      updaterEdit(data) {
        const info = _.pickBy(this.cluster, _.identity)
        const items = data.map(e=>_.get(e, '_id'))

        const m = {
          ...info,
          items
        }

        console.log(m)
        this.$emit('update', m)
      }
    }
  }

</script>
