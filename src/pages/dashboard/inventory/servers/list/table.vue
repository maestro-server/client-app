<template>
  <v-client-table v-if="items.length > 0" name="servers-list" :data="items" :columns="columns" :options="options">
    <template slot="hostname" scope="props">
        <a href="#">{{props.row.hostname}}</a>
    </template>
    <template slot="actions" scope="props">
        <div>
            <a class="fa fa-edit btn btn-primary btn-xs" href="#"></a>
            <a class="fa fa-trash btn btn-danger btn-xs" href="#"></a>
        </div>
    </template>
  </v-client-table>
</template>


<script>
'use strict'
import moment from 'moment'

export default {

  data: function () {
    return {
      items: [],
      columns: ['hostname', 'ipv4_private', 'os', 'dc', 'environment', 'role', 'auth', 'user', 'updated_at', 'created_at', 'actions'],
      options: {
       saveState: true,
       uniqueKey: "_id",
       perPage: 25,
       filterByColumn: true,
       filterable: ['hostname', 'ipv4_private', 'os', 'dc', 'role', 'environment', 'auth', 'user', 'updated_at', 'created_at'],
       sortIcon: { base:'fa', up:'fa-arrow-up', down:'fa-arrow-down' },
       listColumns:{
         role: [{text:'application'}, {text:'container'}, {text:'database'}, {text:'hybrid'}],
         environment: [{text:'production'}, {text:'staging'}, {text:'development'}, {text:'uta'}]
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
    prepared (data) {
      this.items = data.map((d) => {
       d.os=d.os.dist
       d.dc=d.dc.name
       d.user=d.auth.reduce((o, f) => `${o.admin} ${f.admin}`, {admin:''})
       d.auth=d.auth.reduce((o, f) => `${o.name} ${f.name}`, {name:''})
       d.updated_at = moment.utc(d.updated_at)
       d.created_at = moment.utc(d.created_at)
       return d
     })
    }
  }

}

</script>
