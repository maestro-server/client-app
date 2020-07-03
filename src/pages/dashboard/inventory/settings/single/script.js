"use strict";

import Maestro from "factories/maestro";
import svTable from "./services/table";
import adminTable from "./adminer/table";
import regionsTable from "./regions/table";

import ListTable from "mixins/list-table";
import FetchEntity from "services/fetchEntity";

export default {
  mixins: [ListTable],

  components: {
    svTable,
    adminTable,
    regionsTable
  },

  computed: {
    MOptions() {
      return this.$parent.$refs.modal_options;
    }
  },

  data: function() {
    return {
      title: "Settings",
      name: "Services",
      options: {
        info: {}
      }
    };
  },

  methods: {
    optE: function(entity) {
      this.MOptions.onFinishCallBack(
        this.$refs.svTable.$refs.vTable.refresh
      ).show(entity);
    },

    fetchData() {
      FetchEntity(Maestro)().find(e => {
        this.$set(this.options, "info", e.data);
      });
    }
  },

  created() {
    this.fetchData();
  }
};
