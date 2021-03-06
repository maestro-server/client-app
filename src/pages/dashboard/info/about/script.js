"use strict";

import Maestro from "factories/maestro";
import FetchEntity from "services/fetchEntity";

export default {
  data: function() {
    return {
      title: "About",
      services: [],
      clients: {
        name: "Client",
        description: "Single page application",
        version: this.$store.getters.get_version,
        status: "UP"
      }
    };
  },

  methods: {
    fetchData() {
      FetchEntity(Maestro)({ path: "/versions" }).find(e => {
        e.data.unshift(this.clients);
        this.$set(this, "services", e.data);
      });
    }
  },

  created() {
    this.fetchData();
  }
};
