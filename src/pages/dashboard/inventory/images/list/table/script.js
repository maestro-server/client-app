"use strict";

import Images from "factories/images";
import VueTable from "mixins/vue-table";
import Datacenters from "factories/datacenters";
import FetchEntity from "services/fetchEntity";

export default {
  mixins: [VueTable],

  data: function() {
    return {
      entity: new Images(),
      columns: ["name", "ldatacenters", "unique_id", "size", "actions"],
      options: {
        orderBy: { column: "updated_at", ascending: false },
        filterable: ["name", "ldatacenters"],
        listColumns: {
          ldatacenters: []
        },
        headings: {
          lcontact: "Contacts",
          ldatacenters: "Datacenters",
          updated_at: "Updated At",
          created_at: "Created At"
        }
      }
    };
  },

  methods: {
    prepared(data) {
      return data.map(d => {
        d.ldatacenters = _.get(d, "datacenters.name", "-");

        d.updated_at = new Date(d.updated_at).toLocaleString();
        d.created_at = new Date(d.created_at).toLocaleString();
        return d;
      });
    }
  },

  created() {
    FetchEntity(Datacenters)().find(this.fetchData("ldatacenters"));
  }
};
