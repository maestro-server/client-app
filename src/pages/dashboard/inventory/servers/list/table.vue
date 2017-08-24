<template>
  <v-server-table
    name="servers-list"
    :url="url"
    :columns="columns"
    :options="options"
    ref="vTable"
  >

    <template slot="hostname" scope="props">
      <router-link :to="'/dashboard/inventory/servers/single/'+props.row._id">{{props.row.hostname}}</router-link>
    </template>
    <template slot="actions" scope="props">
      <div>
        <router-link :to="'/dashboard/inventory/servers/single/'+props.row._id"
                     class="fa fa-eye btn btn-primary btn-xs"></router-link>
        <a class="fa fa-edit btn btn-warning btn-xs" @click.stop="editP(props.row)"></a>
        <a class="fa fa-trash btn btn-danger btn-xs" @click.stop="deleteP(props.row)"></a>
      </div>
    </template>
  </v-server-table>
</template>


<script>
  'use strict'
  import _ from 'lodash'
  import Adminer from 'factories/adminer'
  import Datacenters from 'factories/datacenters'
  import Login from 'services/login'
  import formatAdminer from 'src/resources/libs/formatAdminerData'
  import FectherEntity from 'services/fetchEntity'

  export default {

    data: function () {
      return {
        url: `${API_URL}/servers/`,
        items: [],
        columns: ['hostname', 'ipv4_private', 'os', 'datacenters', 'environment', 'role', 'auth', 'user', 'updated_at', 'created_at', 'actions'],
        options: {
          headers: {Authorization: Login.Authorization()},
          responseAdapter: (resp) => ({
              data: this.prepared(resp.data.items),
              count: resp.data.found
            }
          ),
          filterable: ['hostname', 'ipv4_private', 'os', 'datacenters', 'role', 'environment', 'auth', 'user'],
          listColumns: {
            role: [],
            environment: [],
            os: [],
            datacenters: [],
            auth: []
          },
          headings: {
            ipv4_private: 'IP Private',
            updated_at: 'Updated At',
            created_at: 'Created At'
          }
        }
      }
    },

    methods: {
      prepared(data) {
        return data.map((d) => {
          d.os = `${_.get(d, 'os.base', '')} ${_.get(d, 'os.dist', '')}`
          d.datacenters = _.get(d, 'datacenters.name', '-')


          d.user = _.reduce(d.auth, function(o, f, k) {
            const str = k > 0 ? "|" : ""
            return `${o} ${str} ${f.username}`;
          }, "");

          d.auth = _.reduce(d.auth, function(o, f, k) {
            const str = k > 0 ? "|" : ""
            return `${o} ${str} ${f.type}`;
          }, "");


          d.updated_at = new Date(d.updated_at).toLocaleString()
          d.created_at = new Date(d.created_at).toLocaleString()
          return d
        })
      },

      fetchAdminer(e) {
        const data = formatAdminer(e)
        _.forEach(this.options.listColumns, (val, key) => {
          const list = _.get(data, key)

          if (!_.isEmpty(list)) {
            this.options.listColumns[key] = list.map(item => ({text: item}))
          }
        })
      },

      fetchDatacenter(e) {
        const data = _.get(e, 'data.items')
        if (!_.isEmpty(data)) {
          this.options.listColumns.datacenters = data.map(item => ({text: item.name}))
        }
      },

      editP(data) {
        this.$parent.editE(data)
      },

      deleteP(data) {
        this.$parent.deleteE(data)
      }
    },

    created() {
      FectherEntity(Adminer)(this)({k: 'server_options', persistence: 'local'})
        .find(this.fetchAdminer, {key: 'server_options'})

      FectherEntity(Datacenters)(this)({k: 'datacenter'})
        .find(this.fetchDatacenter)
    }
  }

</script>
