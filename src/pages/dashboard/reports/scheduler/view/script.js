"use strict";
import _ from "lodash";

import Scheduler from "factories/scheduler";
import ViewSingle from "mixins/view-single";
import formatDate from "mixins/formatDate";
import FetchEntity from "services/fetchEntity";

export default {
  mixins: [ViewSingle, formatDate],

  data: function() {
    return {
      entity: Scheduler,
      model: { tags: [] },
      events: []
    };
  },

  computed: {
    MMembers() {
      return this.$parent.$refs.modal_members;
    },
    filtered() {
      return _.omit(this.model, ["owner", "roles", "_links"]);
    },
    viewDisplayer() {
      return [
        {
          val: _.get(this.model, "enabled") ? "Active" : "Disabled",
          type: _.get(this.model, "enabled") ? "success" : "danger"
        },
        { val: _.get(this.model, "period_type") },
        { val: _.get(this.model, "task") },
        { val: _.get(this.model, "total_run_count", 0) }
      ];
    }
  },

  methods: {
    fetchEvents() {
      FetchEntity(Scheduler)({ force: true }).findOne(
        this.prepareEvents,
        `${_.get(this.model, "_id")}/events?orderBy=created_at`
      );
    },

    prepareEvents(result) {
      const events = _.chain(result)
        .get("data.items", [])
        .value();

      this.$set(this, "events", events);
    }
  },

  created() {
    this.$on("finishFetchData", this.fetchEvents);
  },

  destroyed() {
    this.$off("finishFetchData", this.fetchEvents);
  }
};
