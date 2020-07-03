"use strict";
import _ from "lodash";
import Modals from "mixins/modals";
import verifyDuplicate from "mixins/verify_duplicate";
import Servers from "factories/servers";
import Adminer from "factories/adminer";
import FetchEntity from "services/fetchEntity";

import tabDatacenter from "src/pages/dashboard/_modules/tabs/tab_datacenter";
import tabAuth from "src/pages/dashboard/_modules/tabs/tab_auth";
import tabSetups from "src/pages/dashboard/_modules/tabs/tab_setups";
import tabStorage from "src/pages/dashboard/_modules/tabs/tab_storage";
import tabTags from "src/pages/dashboard/_modules/tabs/tab_tags";

export default {
  mixins: [Modals, verifyDuplicate],

  components: {
    tabDatacenter,
    tabAuth,
    tabSetups,
    tabStorage,
    tabTags
  },

  data: function() {
    const defaultServer = {
      status: "Active",
      role: null,
      storage: [],
      auth: [],
      services: [],
      tags: [],
      datacenters: {},
      os: { base: null, dist: null, version: null }
    };

    return {
      zone: null,
      showModalDC: false,
      showModalZones: false,
      initialData: _.clone(defaultServer),
      data: _.clone(defaultServer),
      os: { base: null, dist: null, version: null },
      entity: Servers,
      options: {
        status: [],
        environment: [],
        os: [],
        serverType: [],
        storage: [],
        auth: [],
        services: [],
        tags: []
      }
    };
  },

  computed: {
    tab_dc() {
      return this.$refs.tab_dc;
    },
    tab_storage() {
      return this.$refs.tab_storage;
    },
    tab_auth() {
      return this.$refs.tab_auth;
    },
    tab_services() {
      return this.$refs.tab_services;
    },
    tab_tags() {
      return this.$refs.tab_tags;
    }
  },

  methods: {
    afterShow() {
      this.text.title = this.create
        ? "Create new Server"
        : `Edit ${this.model.name} server`;
    },

    createLoad() {
      this.tabShow = 0;
      this.data = _.clone(this.initialData);
      this.clearDuplicate();
      this.os = { base: null, dist: null, version: null };
      this.tab_dc.reset();
      this.tab_storage.reset();
      this.tab_auth.reset();
      this.tab_services.reset();
      this.tab_tags.reset();
    },

    editLoad() {
      const { _id } = this.model;
      this.clearDuplicate();

      FetchEntity(Servers)().findOne(e => {
        this.model = e.data;
        this.$set(this, "data", this.model);

        this.$set(this, "os", _.defaults(this.model.os, this.os));

        this.tab_dc.updaterEdit(_.get(this.model, "datacenters", {}));
        this.tab_storage.updaterEdit(_.get(this.model, "storage", []));
        this.tab_auth.updaterEdit(_.get(this.model, "auth", []));
        this.tab_services.updaterEdit(_.get(this.model, "services", []));
        this.tab_tags.updaterEdit(_.get(this.model, "tags", []));
      }, _id);
    },

    setupModel() {
      this.model = _.pickBy(this.data, _.identity);
      this.model.os = _.pickBy(this.os, _.identity);
    },

    createSave() {
      this.setupModel();

      FetchEntity(Servers)().create(this.finishJob, this.model);
    },

    editSave() {
      this.setupModel();
      FetchEntity(Servers)().update(this.finishJob, this.model);
    },

    fetchData() {
      FetchEntity(Adminer)({ persistence: "local" }).find(this.fetchAdminer, {
        key: "server_options"
      });

      FetchEntity(Adminer)({ persistence: "local" }).find(this.fetchAdminer, {
        key: "env_options"
      });
    }
  },

  created() {
    this.fetchData();
  }
};
