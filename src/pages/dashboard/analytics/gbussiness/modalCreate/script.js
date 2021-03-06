"use strict";

import _ from "lodash";
import Modals from "mixins/modals";
import Graphs from "factories/graphs";
import FetchEntity from "services/fetchEntity";
import tabApps from "src/pages/dashboard/_modules/tabs/tab_family_applications";
import tabSystem from "src/pages/dashboard/_modules/tabs/tab_system";
import tabClients from "src/pages/dashboard/_modules/tabs/tab_clients";

export default {
  mixins: [Modals],

  components: {
    tabSystem,
    tabClients,
    tabApps
  },

  watch: {
    tabShow(val) {
      for (const key in this.filter) {
        if (parseInt(key) !== parseInt(val)) {
          const item = this.filter[key];
          this.$set(this.data, item, []);
          this[`tab_${item}`].updaterEdit([]);
        }
      }
    }
  },

  data() {
    return {
      tabShow: 0,
      type: "bussiness",
      data: { name: null, clients: [], systems: [], apps: [], tab: 0 },
      filter: ["system", "clients", "apps"]
    };
  },

  computed: {
    tab_system() {
      return this.$refs.tab_system;
    },
    tab_clients() {
      return this.$refs.tab_clients;
    },
    tab_apps() {
      return this.$refs.tab_apps;
    }
  },

  methods: {
    afterShow() {
      this.text.title = this.create
        ? "Create new Graph"
        : `Edit ${this.model.name} graph`;
    },

    createLoad() {
      this.tabShow = 0;
      this.data = {};
      this.tab_apps.reset();
      this.tab_clients.reset();
      this.tab_system.reset();
    },

    editLoad() {
      this.$set(this, "tabShow", this.model.tab);

      this.$set(this, "data", this.model);
      this.tab_apps.updaterEdit(_.get(this.model, "apps", []));
      this.tab_system.updaterEdit(_.get(this.model, "systems", []));
      this.tab_clients.updaterEdit(_.get(this.model, "clients", []));
    },

    setupModel() {
      this.$set(this.data, "type", this.type);
      this.$set(this.data, "tab", this.tabShow);

      this.model = _.pickBy(this.data, _.identity);
    },

    createSave() {
      this.setupModel();

      FetchEntity(Graphs)().create(this.finishJob, this.model);
    },

    editSave() {
      this.setupModel();

      FetchEntity(Graphs)().update(this.finishJob, this.model);
    }
  }
};
