"use strict";

import Modals from "mixins/modals";

export default {
  mixins: [Modals],

  data: function() {
    return {
      dbs: [
        {
          label: "Oracle",
          icon: "icon-oracle",
          key: "oracle",
          method: ["Oracle Database", "ASM SOA"]
        },
        {
          label: "MySQL",
          key: "mysql",
          icon: "icon-mysql-server",
          method: ["MySQL", "MariaDB/Aurora"]
        },
        {
          label: "Database",
          icon: "fa fa-database",
          key: "create",
          method: []
        }
      ]
    };
  },

  methods: {
    MModal(modal) {
      return this.$parent.$refs[`modal_${modal}`];
    },

    afterShow() {
      this.text.title = "Choose your Database";
    },

    callStep2(db) {
      const activeModel = this.MModal(db.key);
      activeModel.onFinishCallBack(this.finishJob).show();
    }
  }
};
