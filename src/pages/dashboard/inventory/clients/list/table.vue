<template>
  <v-server-table
    name="client-list"
    :url="url"
    :columns="columns"
    :options="options"
    ref="vTable"
  >

    <template slot="actions" scope="props">
      <div class="min-table">
        <router-link :to="'/dashboard/inventory/clients/single/'+props.row._id"
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
  import Clients from 'factories/clients'

  export default {

    data: function () {
      return {
        items: [],
        columns: ['name', 'contact','updated_at', 'created_at', 'actions'],
        options: {
          headers: {Authorization: Login.Authorization()},
          responseAdapter: (resp) => ({
              data: this.prepared(_.get(resp, 'data.items', [])),
              count: resp.data.found
            }
          ),
          filterable: ['name'],
          headings: {
            updated_at: 'Updated At',
            created_at: 'Created At'
          }
        }
      }
    },

    computed: {
      url() {
        const aa = new Clients().getUrl()
        return `${API_URL}${aa}`
      }
    },

    methods: {
      prepared(data) {
        return data.map((d) => {
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
    }
  }

</script>
