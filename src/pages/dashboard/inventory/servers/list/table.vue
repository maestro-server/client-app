<template>
  <v-server-table
  name="servers-list"
  url="http://127.0.0.1:8888/servers/"
  :columns="columns"
  :options="options"
  >

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
import _ from 'lodash'
import Adminer from 'factories/adminer'
import Datacenters from 'factories/datacenters'
import Login from 'services/login'
import formatAdminer from 'src/resources/libs/formatAdminerData'
import FectherEntity from 'services/fetchEntity'

export default {

  data: function () {
    return {
      items: [],
      columns: ['hostname', 'ipv4_private', 'os', 'dc', 'environment', 'role', 'auth', 'user', 'updated_at', 'created_at', 'actions'],
      options: {
       headers: { Authorization: Login.Authorization() },
       responseAdapter: (resp) => ({
           data: this.prepared(resp.data.items),
           count: resp.data.found}
        ),
       filterable: ['hostname', 'ipv4_private', 'os', 'dc', 'role', 'environment', 'auth', 'user'],
       listColumns:{
         role:[],
         environment: [],
         os: [],
         dc: []
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
       d.os=`${d.os.base} ${d.os.dist}`
       d.dc=d.dc.name
       d.user=d.auth.reduce((o, f) => `${o.admin} ${f.admin}`, {admin:''})
       d.auth=d.auth.reduce((o, f) => `${o.name} ${f.name}`, {name:''})
       d.updated_at = new Date(d.updated_at).toLocaleString(),
       d.created_at = new Date(d.created_at).toLocaleString()
       return d
     })
   },

   fetchAdminer (e) {
      const data = formatAdminer(e)
     _.forEach(this.options.listColumns, (val, key) => {
       const list = _.get(data, key)

       if(!_.isEmpty(list)) {
         this.options.listColumns[key] = list.map(item=>({text: item}))
       }
     })
   },

   fetchDatacenter (e) {
     const data = _.get(e, 'data.items')
     if(!_.isEmpty(data)) {
       this.options.listColumns.dc = data.map(item=>({text: item.name}))
     }
   }
 },

 created() {
   FectherEntity(Adminer)(this)({k: 'server_options', p: true})
   .find(this.fetchAdminer, {key: 'server_options'})

   FectherEntity(Datacenters)(this)({k: 'datacenter'})
   .find(this.fetchDatacenter)
 }
}

</script>
