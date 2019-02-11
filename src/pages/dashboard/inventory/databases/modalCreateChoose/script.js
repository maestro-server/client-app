'use strict'

import Modals from 'mixins/modals'


export default {
  mixins: [Modals],

  data: function () {
    return {
      dbs: [
        {
          label: 'Oracle Database',
          icon: 'icon-oracle',
          key: 'oracle',
          method: [
            {label: "Oracle Database"},
            {label: "Database for Services (ASM, SOA)"}
          ]
        },
        {
          label: 'MySQL',
          key: 'mysql',
          icon: 'icon-mysql-server',
          method: [
            {label: "MySQL"},
            {label: "MariaDB"},
            {label: "Percona"},
            {label: "Aurora"}
          ]
        },
        {
          label: 'Other Database',
          icon: 'fa fa-database',
          key: 'create',
          method: [
            {label: "ElasticSearch"},
            {label: "Solr"},
            {label: "MongoDB"},
            {label: "Etc"}
          ]
        }
      ]
    }
  },

  methods: {
    MModal(modal) {
      return this.$parent.$refs[`modal_${modal}`]
    },

    afterShow() {
      this.text.title = 'Choose your Database'
    },

    callStep2(db) {
      const activeModel = this.MModal(db.key)
      activeModel
        .onFinishCallBack(this.finishJob)
        .show()
    }
  }

}
