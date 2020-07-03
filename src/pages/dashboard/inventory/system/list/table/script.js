"use strict";

import Clients from "factories/clients";
import VueTable from "mixins/vue-table";
import System from "factories/system";

import FetchEntity from "services/fetchEntity";

export default {
  mixins: [VueTable],

  data: function() {
    return {
      entity: new System(),
      columns: ["name", "lclients", "updated_at", "created_at", "actions"],
      options: {
        orderBy: { column: "updated_at", ascending: false },
        filterable: ["name", "lclients"],
        listColumns: {
          lclients: []
        },
        headings: {
          lclients: "Client",
          updated_at: "Updated At",
          created_at: "Created At"
        }
      }
    };
  },

  methods: {
    prepared(data) {
      return data.map(d => {
        d.links = _.reduce(
          d.check,
          (o, f, k) => this.viewReducer(o, f, k, "key"),
          ""
        );
        d.lclients = _.reduce(
          d.clients,
          (o, f, k) => this.viewReducer(o, f, k, "name"),
          ""
        );

        d.updated_at = new Date(d.updated_at).toLocaleString();
        d.created_at = new Date(d.created_at).toLocaleString();
        return d;
      });
    }
  },

  created() {
    FetchEntity(Clients)().find(this.fetchData("lclients"));
  }
};
