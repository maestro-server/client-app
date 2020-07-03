"use strict";

import Modals from "mixins/modals";
import Projects from "factories/projects";
import FetchEntity from "services/fetchEntity";

export default {
  mixins: [Modals],

  methods: {
    afterShow() {
      this.text.title = this.create
        ? "Create new Project"
        : `Edit ${this.model.name} project`;
    },

    createSave() {
      FetchEntity(Projects)().create(this.finishJob, this.model);
    },

    editSave() {
      FetchEntity(Projects)().update(this.finishJob, this.model);
    }
  }
};
