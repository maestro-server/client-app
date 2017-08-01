'use strict'
import _ from 'lodash'
import svTable from './table'


export default {
  components: {
    svTable
  },

  data: function () {
    return {
      result: {
        items: []
      },
      team: false
    }
  },

  computed: {
    MCreate() {
      return this.$parent.$refs.modal_create
    },
    MDelete() {
      return this.$parent.$refs.modal_delete
    },
    title() {
      return this.team ? this.team.name + ' Servers' : 'My Servers'
    }
  },

  methods: {
    cap(data) {
      return data.charAt(0).toUpperCase() + data.slice(1)
    },

    addE: function () {
      const {team} = this

      this.MCreate
        .setupSteps(1, 1, 1)
        .onFinishCallBack(() => {
          this.$refs.svTable.$refs.vTable.refresh()
        })
        .show({team})
    },

    editE: function (entity) {
      const {team} = this

      this.MCreate
        .setupSteps(1, 1, 1)
        .onFinishCallBack(() => {
          this.$refs.svTable.$refs.vTable.refresh()
        })
        .show(_.merge(entity, {team}))
    },

    deleteE: function (entity) {
      const {team} = this

      this.MDelete
        .onFinishCallBack(() => {
          this.$refs.svTable.$refs.vTable.refresh()
        })
        .show(_.merge(entity, {team}))
    }
  },

  created() {
    if (_.has(this.$route, 'query.team_id')) {
      this.team = {
        '_id': this.$route.query.team_id,
        'name': this.$route.query.team_name
      }
    }
  }
}
