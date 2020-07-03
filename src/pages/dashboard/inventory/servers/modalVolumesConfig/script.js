"use strict";

import _ from "lodash";
import Modals from "mixins/modals";
import Servers from "factories/servers";
import FetchEntity from "services/fetchEntity";
import TabCreaterList from "mixins/tab-creater-list";

export default {
  mixins: [Modals, TabCreaterList],

  props: {
    provider: {}
  },

  data: function() {
    return {
      enabled: false,
      initialData: {
        partitions: [],
        lvm: [],
        name: null,
        device: null
      },
      data: {},
      options: {
        managers: []
      },
      single: {
        device: null,
        name: null,
        mount: null,
        ftype: null,
        size: null
      },
      single_lvm: {
        size: null,
        pv: null,
        vg: null
      }
    };
  },

  methods: {
    afterShow() {
      const name = _.get(this.model, "item.name");
      this.text.title = `Volume Config "${name}"`;
    },

    createLoad() {
      const data = _.get(this.model, `item`, _.clone(this.initialData));
      this.$set(this, "data", data);
      this.$set(this, "enabled", _.get(this.data, "lvm", false));
    },

    setupModel() {
      const { index } = this.model;
      const { data } = this;
      this.$set(data, "lvm", this.enabled);

      const merged = _.assign(
        _.get(this.provider, `storage[${index}]`, {}),
        data
      );
      const clean = _.pickBy(merged, _.identity);

      _.set(this.provider, `storage[${index}]`, clean);
    },

    createSave() {
      this.setupModel();

      FetchEntity(Servers)().patch(this.finishJob, this.provider);
    }
  }
};
