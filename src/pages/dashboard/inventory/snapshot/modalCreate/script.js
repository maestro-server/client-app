"use strict";

import Modals from "mixins/modals";
import Snapshots from "factories/snapshots";
import FetchEntity from "services/fetchEntity";

import tabTags from "src/pages/dashboard/_modules/tabs/tab_tags";
import tabAppDc from "src/pages/dashboard/_modules/tabs/tab_app_datacenter.vue";

export default {
  mixins: [Modals],

  components: {
    tabTags,
    tabAppDc
  },

  computed: {
    tab_app_dc() {
      return this.$refs.tab_app_dc;
    },
    tab_tags() {
      return this.$refs.tab_tags;
    }
  },

  data() {
    return {
      data: {
        name: null,
        tags: [],
        datacenters: {}
      }
    };
  },

  methods: {
    afterShow() {
      this.text.title = this.create
        ? "Create new Server"
        : `Edit ${this.model.name} server`;
    },

    createLoad() {
      this.tabShow = 0;
      this.data = {};
      this.tab_app_dc.reset();
      this.tab_tags.reset();
    },

    editLoad() {
      this.$set(this, "data", this.model);
      this.tab_app_dc.updaterEdit(_.get(this.model, "datacenters", {}));
      this.tab_tags.updaterEdit(_.get(this.model, "tags", []));
    },

    setupModel() {
      this.model = _.pickBy(this.data, _.identity);
    },

    createSave() {
      this.setupModel();

      FetchEntity(Snapshots)().create(this.finishJob, this.model);
    },

    editSave() {
      this.setupModel();
      FetchEntity(Snapshots)().update(this.finishJob, this.model);
    }
  }
};
