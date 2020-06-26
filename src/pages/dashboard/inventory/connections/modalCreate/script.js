"use strict";

import _ from "lodash";
import Modals from "mixins/modals";
import Providers from "factories/providers";
import Connections from "factories/connections";
import Datacenters from "factories/datacenters";
import FetchEntity from "services/fetchEntity";

export default {
  mixins: [Modals],

  data: function() {
    return {
      provider: null,
      methods: null,
      tabShow: 0,
      data: {
        conn: {},
        name: null,
        provider: null,
        regions: [],
        actived: null,
        service: null,
        dc_id: ""
      },
      dcs: [],
      regions: [],
      options: { providers: [], dcs: [] }
    };
  },

  computed: {
    toIcon: function() {
      return `icon-${this.provider.toLowerCase()}`;
    }
  },

  methods: {
    afterShow() {
      this.text.title = this.create
        ? "Third party connection"
        : `Edit or config ${this.model.name} provider`;
    },

    setupModel() {
      this.model = _.pickBy(this.data, _.identity);

      const template = _.get(this.methods, `[${this.tabShow}]`);
      if (!_.get(template, "template.dc[1]", true)) {
        this.model.regions = ["all"];
      }

      this.model.name = `${this.model.dc} - ${this.provider}[${template.label}]`;

      this.model.service = _.get(template, "service", this.provider);
      this.model.provider = this.provider;
      this.model.tab = this.tabShow;
    },

    createLoad() {
      this.provider = null;
      this.methods = null;
      this.tabShow = 0;
      this.data = { conn: {} };
    },

    createSave() {
      this.setupModel();

      FetchEntity(Connections)().create(this.redirectConn, this.model);
    },

    redirectConn(result) {
      const id = _.get(result, "data._id");

      if (id) {
        const path = { name: "connections.single", params: { id } };
        this.$router.push(path);
      }

      this.finishJob(result);
    },

    editLoad() {
      this.$set(this, "data", this.model);
      this.setTemplate(this.model.provider);
      this.tabShow = this.model.tab;
    },

    editSave() {
      this.setupModel();
      FetchEntity(Connections)().update(this.finishJob, this.model);
    },

    callStep(prv) {
      this.setTemplate(prv.label);
    },

    setTemplate(label) {
      FetchEntity(Providers)().findOne(data => {
        const obj = _.get(data, "data.items[0].value.providers");
        this.provider = _.get(obj, "label");
        this.methods = _.get(obj, "data");

        this.fetchData(_.get(obj, "dc", null));
      }, this.formatProvider(label));
    },

    formatProvider(label) {
      return _.toLower(label).replace(/\s/g, "");
    },

    fetchData: function(provider) {
      FetchEntity(Datacenters)({ force: true }).find(this.fetchDatacenter, {
        provider
      });
    },

    fetchDatacenter(e) {
      const data = _.get(e, "data.items");
      if (!_.isEmpty(data)) {
        this.options.dcs = data.map(item => ({
          value: item,
          label: item.name
        }));
        this.dcs = data.map(item => item.name);
      }
    },

    updateRegions(val) {
      const dc = _.head(this.options.dcs.filter(d => d.label === val));
      this.regions = _.get(dc, "value.regions", []);
      this.data.dc_id = _.get(dc, "value._id", _.get(this.data, "dc_id"));
    },

    fetchProviders() {
      FetchEntity(Providers)({ force: true }).find(this.fetchAdminer);
    }
  },

  created() {
    this.fetchProviders();
  }
};
