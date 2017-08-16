<template>
  <v-server-table
    name="system-list"
    :url="url"
    :columns="columns"
    :options="options"
    ref="vTable"
  >

    <template slot="actions" scope="props">
      <div>
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

  export default {

    data: function () {
      return {
        url: `${API_URL}/system/`,
        items: [],
        columns: ['name', 'links', 'updated_at', 'created_at', 'actions'],
        options: {
          headers: {Authorization: Login.Authorization()},
          responseAdapter: (resp) => ({
              data: this.prepared(resp.data.items),
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

    methods: {
      prepared(data) {
        return data.map((d) => {

          d.links = _.reduce(d.check, function(o, f, k) {
            const str = k > 0 ? "|" : ""
            return `${o} ${str} ${f.key}`;
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
      }
    }
  }

</script>
