<template>
  <v-server-table
    name="app -list"
    :url="url"
    :columns="columns"
    :options="options"
    ref="vTable"
  >


    <template slot="hostname" scope="props">
      <router-link :to="'/dashboard/inventory/applications/single/'+props.row._id">{{props.row.name}}</router-link>
    </template>
    <template slot="qtdserver" scope="props">
      <bs-label>{{props.row.qtdserver}}</bs-label>
    </template>
    <template slot="qtddeploy" scope="props">
      <bs-label>{{props.row.qtddeploy}}</bs-label>
    </template>
    <template slot="actions" scope="props">
      <div>
        <router-link :to="'/dashboard/inventory/applications/single/'+props.row._id"
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

  export default {

    data: function () {
      return {
        url: `${API_URL}/applications/`,
        items: [],
        columns: ['name', 'system', 'language', 'environment', 'qtdserver', 'qtddeploy', 'updated_at', 'created_at', 'actions'],
        options: {
          headers: {Authorization: Login.Authorization()},
          responseAdapter: (resp) => ({
              data: this.prepared(resp.data.items),
              count: resp.data.found
            }
          ),
          filterable: ['name', 'language', 'environment'],
          headings: {
            updated_at: 'Updated At',
            qtdserver: 'Servers',
            qtddeploy: 'Deploys',
            created_at: 'Created At'
          }
        }
      }
    },

    methods: {
      prepared(data) {
        return data.map((d) => {
          d.system = _.get(d, 'system.name', '')
          d.qtdserver = _.size(d.servers)
          d.qtddeploy = _.size(d.deploy)


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
      }
    },

    created() {
    }
  }

</script>
