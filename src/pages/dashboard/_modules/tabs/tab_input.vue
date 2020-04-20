<template>
  <div>
    <template>
      <span v-for="form, i in mapper" :key="i">
        <bs-input
          v-model="data[form.name]"
          v-validate.initial="form.validate"
          class="mt20"
          form-type="horizontal"
          :name="form.name"
          :label="form.label"
          :type="form.type"
          :error="makeError(form.name)"
          @blur="onHit"
        />
      </span>
    </template>
  </div>
</template>


<script>
"use strict";
import _ from "lodash";

export default {
  props: {
    mapper: {}
  },

  data: function () {
    const resetData = { name: null, id: null, link: null, notes: null };

    return {
      resetData: resetData,
      data: _.clone(resetData)
    };
  },

  methods: {
    onHit () {
      this.$emit("update", this.data);
    },

    updaterEdit (data = {}) {
      this.$set(this, "data", data);
      const dpp = _.pickBy(data, _.identity);
      this.$emit("update", dpp);
    },

    reset () {
      this.$set(this, "data", _.clone(this.resetData));
    }
  }
};
</script>
