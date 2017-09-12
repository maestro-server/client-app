<template>
  <v-server-table
    name="system-list"
    :url="url"
    :columns="columns"
    :options="options"
    ref="vTable"
  >

    <template slot="actions" scope="props">
      <div class="min-table">
        <router-link :to="'/dashboard/inventory/system/single/'+props.row._id"
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
  import Login from 'services/login'
  import FectherEntity from 'services/fetchEntity'
  import Clients from 'factories/clients'
  import System from 'factories/system'

  export default {

    data: function () {
      return {
        items: [],
        columns: ['name', 'lclients',  'links', 'updated_at', 'created_at', 'actions'],
        options: {
          headers: {Authorization: Login.Authorization()},
          responseAdapter: (resp) => ({
              data: this.prepared(resp.data.items),
              count: resp.data.found
            }
          ),
          filterable: ['name', 'lclients'],
          listColumns: {
            lclients: []
          },
          headings: {
            lclients: "Client",
            updated_at: 'Updated At',
            created_at: 'Created At'
          }
        }
      }
    },

    computed: {
      url() {
        const aa = new System().getUrl()
        return `${API_URL}${aa}`
      }
    },

    methods: {
      prepared(data) {
        return data.map((d) => {

          d.links = _.reduce(d.check, function(o, f, k) {
            const str = k > 0 ? "|" : ""
            return `${o} ${str} ${f.key}`;
          }, "");

          d.lclients = _.reduce(d.clients, function(o, f, k) {
            const str = k > 0 ? "|" : ""
            return `${o} ${str} ${f.name}`;
          }, "");


          d.updated_at = new Date(d.updated_at).toLocaleString()
          d.created_at = new Date(d.created_at).toLocaleString()
          return d
        })
      },

      editP(data) {
        this.$parent.editE(data)
      },

      deleteP(data) {
        this.$parent.deleteE(data)
      },

      fetchClients(e) {
        const data = _.get(e, 'data.items')
        if (!_.isEmpty(data)) {
          this.options.listColumns.lclients = data.map(item => ({text: item.name}))
        }
      }
    },

    created() {
      FectherEntity(Clients)({k: 'clients'})
        .find(this.fetchClients)
    }
  }

</script>
