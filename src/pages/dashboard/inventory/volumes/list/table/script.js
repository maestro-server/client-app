"use strict";

import Volumes from "factories/volumes";
import VueTable from "mixins/vue-table";
import Datacenters from "factories/datacenters";
import FetchEntity from "services/fetchEntity";

export default {
  mixins: [VueTable],

  data: function() {
    return {
      entity: new Volumes(),
      columns: [
        "status",
        "name",
        "size",
        "iops",
        "unique_id",
        "ldatacenters",
        "created_at",
        "actions"
      ],
      options: {
        orderBy: { column: "updated_at", ascending: false },
        filterable: ["name", "unique_id", "ldatacenters", "vpc_id", "family"],
        listColumns: {
          ldatacenters: []
        },
        headings: {
          ldatacenters: "Datacenters"
        }
      }
    };
  },

  methods: {
    prepared(data) {
      return data.map(d => {
        d.ldatacenters = _.get(d, "datacenters.name", "-");
        return d;
      });
    }
  },

  created() {
    FetchEntity(Datacenters)().find(this.fetchData("ldatacenters"));
  }
};
