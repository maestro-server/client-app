"use strict";

import Scheduler from "factories/scheduler";
import VueTable from "mixins/vue-table";
import Adminer from "factories/adminer";
import FetchEntity from "services/fetchEntity";

export default {
  mixins: [VueTable],

  data: function() {
    return {
      entity: new Scheduler(),
      columns: [
        "enabled",
        "name",
        "modules",
        "period_type",
        "total_run_count",
        "updated_at",
        "actions"
      ],
      options: {
        orderBy: { column: "updated_at", ascending: false },
        filterable: ["name", "modules", "period_type"],
        listColumns: {
          period_type: [],
          modules: []
        },
        headings: {
          last_run_at: "Last run At"
        }
      }
    };
  },

  methods: {
    prepared(data) {
      return data.map(d => {
        d.modules = _.get(d, "task");
        d.updated_at = new Date(d.updated_at).toLocaleString();
        return d;
      });
    }
  },

  created() {
    FetchEntity(Adminer)({ persistence: "local" }).find(this.fetchAdminer, {
      key: "scheduler_options"
    });
  }
};
