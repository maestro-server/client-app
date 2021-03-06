"use strict";
import _ from "lodash";

import Servers from "factories/servers";
import Volumes from "factories/volumes";
import Applications from "factories/applications";
import ViewSingle from "mixins/view-single";
import FetchEntity from "services/fetchEntity";
import modalConfig from "../modalServerConfig/create";
import modalVolumes from "../modalVolumesConfig/create";

export default {
  mixins: [ViewSingle],

  components: {
    modalConfig,
    modalVolumes
  },

  data: function() {
    return {
      list_volumes: {},
      list_applications: [],
      entity: Servers,
      model: {
        tags: [],
        auth: [],
        services: [],
        storage: [],
        logs: [],
        os: { base: null },
        datacenters: { name: null },
        active: true
      }
    };
  },

  computed: {
    MApps() {
      return this.$parent.$refs.modal_apps;
    },
    MCreateConfigServer() {
      return this.$refs.modal_config;
    },
    MCreateVolumesServer() {
      return this.$refs.modal_volumes;
    },
    filtered() {
      return _.omit(this.model, [
        "owner",
        "roles",
        "_links",
        "applications",
        "tags"
      ]);
    },
    viewDisplayer() {
      return [
        {
          val: this.model.active ? "Active" : "Terminated",
          type: this.model.active ? "success" : "danger"
        },
        { val: _.get(this.model, "environment") },
        { val: _.get(this.model, "role") },
        { val: _.get(this.model, "os.base", false) },
        { val: _.get(this.model, "datacenters.name", false) },
        { val: _.get(this.model, "ipv4_private") }
      ];
    }
  },

  methods: {
    callConfig(item) {
      this.MCreateConfigServer.onFinishCallBack(() =>
        this.fetchData(this.id)
      ).show(item);
    },

    callVolumes(item) {
      this.MCreateVolumesServer.onFinishCallBack(() =>
        this.fetchData(this.id)
      ).show(item);
    },

    showListVolumes(vol, len = "", def = null) {
      if (_.has(vol, "unique_id") && _.has(this.list_volumes, vol.unique_id)) {
        return _.get(this.list_volumes, `${vol.unique_id}${len}`);
      }

      if (def === true) {
        return vol;
      }
    },

    editM: function() {
      this.MApps.onFinishCallBack(() => this.fetchData(this.id)).show(
        this.model
      );
    },

    fetchVolumes(force = true) {
      if (this.model) {
        const uniques = _.chain(this.model)
          .get("storage")
          .filter(e => _.has(e, "unique_id"))
          .map(e => e.unique_id)
          .value();

        FetchEntity(Volumes)({ force }).find(
          e => {
            this.list_volumes = _.chain(e)
              .get("data.items")
              .reduce((result, value) => {
                result[value.unique_id] = value;
                return result;
              }, {})
              .value();
          },
          { unique_id: uniques }
        );
      }
    },

    fetchApplications(force = true) {
      const apps = _.get(this.model, "applications", []);

      if (this.model && apps.length > 0) {
        FetchEntity(Applications)({ force }).find(
          e => {
            this.list_applications = _.get(e, "data.items");
          },
          { _id: apps.map(e => e._id) }
        );
      }
    }
  },

  created() {
    this.$on("finishFetchData", this.fetchVolumes);
    this.$on("finishFetchData", this.fetchApplications);
  },

  destroyed() {
    this.$off("finishFetchData", this.fetchVolumes);
    this.$off("finishFetchData", this.fetchApplications);
  }
};
