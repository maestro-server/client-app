<template>
  <v-server-table
    name="dc-servers-list"
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
      </div>
    </template>
  </v-server-table>
</template>


<script>
  'use strict'
  import _ from 'lodash'
  import Login from 'services/login'

  export default {
    props: {
      dc_id: {}
    },

    data: function () {
      return {
        url: `${API_URL}/datacenters/${this.dc_id}/servers/`,
        columns: ['hostname', 'ipv4_private', 'os', 'environment', 'role', 'actions'],
        options: {
          headers: {Authorization: Login.Authorization()},
          responseAdapter: (resp) => ({
              data: this.prepared(resp.data.items),
              count: resp.data.found
            }
          ),
          filterable: false,
          headings: {
            ipv4_private: 'IP Private'
          }
        }
      }
    },

    methods: {
      prepared(data) {
        return data.map((d) => {
          d.os = `${_.get(d, 'os.base', '')} ${_.get(d, 'os.dist', '')}`
          return d
        })
      }
    }
  }

</script>
