'use strict'
import Servers from 'factories/servers'
import _ from 'lodash'
import format from 'src/resources/libs/formatData'
import moment from 'moment'

import modalCreate from '../modalCreate/create'
import modalDelete from '../modalDelete/delete'


export default {
  components: {
    modalCreate,
    modalDelete
  },

  data: function () {
    return {
      result: {
        items: []
      },
      team:false,
      columns: ['hostname', 'ipv4_private', 'os', 'dc', 'role', 'environment', 'auth', 'user', 'updated_at', 'created_at', 'edit'],
      options: {
       saveState: true,
       uniqueKey: "_id",
       perPage: 25,
       filterByColumn: true,
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

  computed: {
    MCreate () {return this.$refs.modal_create},
    MDelete () {return this.$refs.modal_delete},
    title () {
      return this.team ? this.team.name+' Servers' : 'My Servers'
    },
    ifDataLoad () {return this.result.items.length}
  },

  methods: {
    format,
    cap(data) {
      return data.charAt(0).toUpperCase() + data.slice(1)
    },

    fetchData: function (query={}) {
      const {team} = this
      const filter = _.merge(query, {team})

      new Servers(filter)
      .authorization()
      .list((e) => {this.result.items = e.data.items.map((d) => {
        d.os=d.os.dist
        d.dc=d.dc.name
        d.user=d.auth.reduce((o, f) => `${o.admin} ${f.admin}`, {admin:''})
        d.auth=d.auth.reduce((o, f) => `${o.name} ${f.name}`, {name:''})
        d.updated_at = moment.utc(d.updated_at)
        d.created_at = moment.utc(d.created_at)
        return d
      })})
    },

    addE: function () {
      const {team} = this

      this.MCreate
        .setupSteps(1,1,1)
        .onFinishCallBack(() => {this.fetchData()})
        .show({team})
    },

    editE: function (entity) {
      const {team} = this

      this.MCreate
        .setupSteps(1,1,1)
        .onFinishCallBack((e) => {
          entity.name = e.name
          entity.email = e.email
        })
        .show(_.merge(entity, {team}))
    },

    deleteE: function (entity) {
      const {team} = this

      this.MDelete
        .onFinishCallBack(() => {
          const narr = this.result.items.filter((e) => {
            return e != project
          })
          this.result.items = narr
        })
        .show(_.merge(entity, {team}))
    },

    changePage (page) {
      this.fetchData({page})
    }
  },

  created () {
    if(_.has(this.$route, 'query.team_id')) {
      this.team = {
        '_id': this.$route.query.team_id,
        'name': this.$route.query.team_name
      }
    }

    this.fetchData({limit:100})
  }
}
