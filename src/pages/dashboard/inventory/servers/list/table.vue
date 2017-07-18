<template>
  <v-server-table
  name="servers-list"
  url="http://127.0.0.1:8888/servers/"
  :columns="columns"
  :options="options">

    <template slot="hostname" scope="props">
        <a href="#">{{props.row.hostname}}</a>
    </template>
    <template slot="actions" scope="props">
        <div>
            <a class="fa fa-edit btn btn-primary btn-xs" href="#"></a>
            <a class="fa fa-trash btn btn-danger btn-xs" href="#"></a>
        </div>
    </template>
  </v-server-table>
</template>


<script>
'use strict'

export default {

  data: function () {
    return {
      items: [],
      columns: ['hostname', 'ipv4_private', 'os', 'dc', 'environment', 'role', 'auth', 'user', 'updated_at', 'created_at', 'actions'],
      options: {
       responseAdapter: (resp) => {
         return {
           data: this.prepared(resp.data.items),
           count: resp.data.found
         }
       },
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
      return data.map((d) => {
       d.os=d.os.dist
       d.dc=d.dc.name
       d.user=d.auth.reduce((o, f) => `${o.admin} ${f.admin}`, {admin:''})
       d.auth=d.auth.reduce((o, f) => `${o.name} ${f.name}`, {name:''})
       d.updated_at = new Date(d.updated_at).toLocaleString(),
       d.created_at = new Date(d.created_at).toLocaleString()
       return d
     })
    }
  }

}

</script>
