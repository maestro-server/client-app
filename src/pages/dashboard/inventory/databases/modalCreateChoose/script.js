'use strict'

import Modals from 'mixins/modals'


export default {
  mixins: [Modals],

  data: function () {
    return {
      dbs: [
        {
          name: 'Oracle Database',
          icon: 'icon-oracle',
          key: 'oracle',
          links: [
            {label: "Oracle Database"},
            {label: "Database for Services (ASM, SOA)"}
          ]
        },
        {
          name: 'MySQL',
          key: 'mysql',
          icon: 'icon-mysql-server',
          links: [
            {label: "MySQL"},
            {label: "MariaDB"},
            {label: "Percona"},
            {label: "Aurora"}
          ]
        },
        {
          name: 'Other Database',
          icon: 'fa fa-database',
          key: 'create',
          links: [
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
