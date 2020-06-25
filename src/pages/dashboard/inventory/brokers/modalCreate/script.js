"use strict";

import Modals from "mixins/modals";
import ModalsApps from "mixins/modals-apps";

import Adminer from "factories/adminer";
import FetchEntity from "services/fetchEntity";
import tabEndpoint from "src/pages/dashboard/_modules/tabs/tab_endpoint";

export default {
  mixins: [Modals, ModalsApps],

  components: {
    tabEndpoint
  },

  data() {
    return {
      family: "Broker",
      initialData: {
        name: null,
        description: null,
        provider: null,
        tags: [],
        role: { endpoint_zookeeper: null, endpoint: null, extra_config: null }
      },
      mapper: [
        { name: "endpoint", label: "Endpoint", validate: "url" },
        {
          name: "endpoint_zookeeper",
          label: "Zookeeper Endpoint",
          validate: "min:2"
        },
        {
          name: "extra_config",
          label: "Extra Config",
          type: "textarea",
          validate: "min:2"
        }
      ]
    };
  },

  computed: {
    tab_endpoint() {
      return this.$refs.tab_endpoint;
    }
  },

  methods: {
    fetchProtocolData() {
      FetchEntity(Adminer)({ persistence: "local" }).find(this.fetchAdminer, {
        key: "deps_options"
      });
    },

    hookCreateLoad() {
      this.tab_endpoint.reset();
      this.fetchProtocolData();
    },

    hookEditLoad() {
      this.tab_endpoint.updaterEdit(this.data.deps);
      this.fetchProtocolData();
    }
  }
};
