"use strict";
import _ from "lodash";
import FetchEntity from "services/fetchEntity";

export default {
  data() {
    return {
      tmp: { created: [], deleted: [] },
      value: [],
      mirrorValue: [],
      cFinish: false
    };
  },

  computed: {
    URL() {
      return `${new this.relation().getUrl()}?query=`;
    },
    relName() {
      return this.relation.ename;
    }
  },

  methods: {
    afterShow() {
      this.text.title = `Add news ${this.relName} into ${this.model.name}`;
    },

    editLoad() {
      const list = _.get(this, `model.${this.fielder}`, []);

      this.$set(this, "value", list);
      this.mirrorValue = _.clone(list.map(e => e._id));

      this.tabRef.updaterEdit(list);
    },

    setupModel() {
      const oldv = this.mirrorValue;
      const newv = this.value;

      this.tmp.created = _.difference(newv, oldv);
      this.tmp.deleted = _.difference(oldv, newv);
      this.cFinish = false;
    },

    editSave() {
      this.setupModel();
      this.createdItems(this.tmp.created);
      this.deletedItems(this.tmp.deleted);
    },

    createdItems(id) {
      if (!_.isEmpty(id)) {
        const _id = `${this.model._id}/${this.relName}`;
        FetchEntity(this.entity)({ force: true }).patch(
          this.coordenateCallbackFinish,
          { id },
          _id
        );
      }
    },

    deletedItems(id) {
      if (!_.isEmpty(id)) {
        const _id = `${this.model._id}/${this.relName}`;
        FetchEntity(this.entity)().remove(
          this.coordenateCallbackFinish,
          { id },
          _id
        );
      }
    },

    coordenateCallbackFinish(response) {
      if (!this.cFinish) {
        this.cFinish = true;
        return this.finishJob(response);
      }
    },

    deleteApp(key) {
      this.value.splice(key, 1);
    }
  }
};
