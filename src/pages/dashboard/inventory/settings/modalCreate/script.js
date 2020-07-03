"use strict";

import Adminer from "factories/adminer";
import Modals from "mixins/modals";
import Services from "factories/services";
import FetchEntity from "services/fetchEntity";
import CacheManager from "services/cacheManager";

import tabItems from "src/pages/dashboard/_modules/tabs/tab_array_item";

export default {
  mixins: [Modals],

  components: {
    tabItems
  },

  computed: {
    tab_items() {
      return this.$refs.tab_items;
    }
  },

  data() {
    return {
      family: null,
      families: [],
      data: {
        name: null,
        family: [],
        tags: []
      },
      options: {
        families: []
      }
    };
  },

  methods: {
    afterShow() {
      this.text.title = this.create
        ? "Create new Service"
        : `Edit ${this.model.name} service`;
    },

    createLoad() {
      this.tabShow = 0;
      this.data = {};
      this.$set(this, "families", []);
      this.family = null;
      this.tab_items.reset();
    },

    editLoad() {
      this.$set(this, "data", this.model);
      this.$set(this, "families", _.get(this.model, "family", []));
      this.tab_items.updaterEdit(_.get(this.model, "tags", []));
    },

    setupModel() {
      this.data.family = _.get(this, "families", null);
      this.model = _.pickBy(this.data, _.identity);
    },

    createSave() {
      this.setupModel();

      FetchEntity(Services)().create(this.finishJob, this.model);

      CacheManager({ persistence: "local" }).clearReg("services");
    },

    editSave() {
      this.setupModel();

      FetchEntity(Services)().patch(this.finishJob, this.model);
    },

    addFamily() {
      this.families.push(this.family);
      this.family = null;
    },

    fetchData() {
      FetchEntity(Adminer)({ persistence: "local" }).find(this.fetchAdminer, {
        key: "application_options"
      });
    }
  },

  created() {
    this.fetchData();
  }
};
