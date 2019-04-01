<template>
  <div>
    <bs-select
      v-model="role"
      form-type="horizontal"
      :options="roles"
      name="role"
      label="Role"
      @input="changeData"
    />
    <hr>

    <h5 v-if="role" class="mt0 text-center">{{ role }} specification</h5>

    <template>
      <bs-input
        v-model="data[form.name]"
        v-validate.initial="form.validate"
        class="mt20"
        form-type="horizontal"
        :name="form.name"
        :label="form.label"
        :type="form.type"
        :placeholder="form.placeholder"
        :error="makeError(form.name)"
        @blur="commitChange"
        v-for="form in forms"
        v-bind:key="form.name"
      />
    </template>
  </div>
</template>


<script>
"use strict";
import _ from "lodash";

export default {
  props: {
    roles: {}
  },

  data: function() {
    const resetData = {
      role: "Application",
      name: null,
      id: null,
      link: null,
      notes: null
    };

    return {
      role: "Application",
      resetData: resetData,
      data: _.clone(resetData),
      mapper: {
        Application: [
          { name: "endpoint", label: "Endpoint", validate: "url" },
          { name: "ports", label: "Port", type: "number", validate: "integer" },
          {
            name: "path",
            label: "Code Path",
            placeholder: "/var/www/myapp",
            validate: "min:2"
          },
          {
            name: "code",
            label: "Command",
            placeholder: "java -jar myapp.jar",
            validate: "min:2"
          },
          {
            name: "description",
            label: "Notes",
            type: "textarea",
            validate: "min:2"
          }
        ],
        Worker: [
          {
            name: "path",
            label: "Code Path",
            placeholder: "/var/www/myapp",
            validate: "min:2"
          },
          {
            name: "code",
            label: "Command",
            placeholder: "java -jar myapp.jar",
            validate: "min:2"
          }
        ],
        Jobs: [
          {
            name: "cron",
            label: "Cron",
            placeholder: "12 * * * *",
            validate: "min:9"
          },
          {
            name: "path",
            label: "Code Path",
            placeholder: "/var/www/myapp",
            validate: "min:2"
          },
          {
            name: "code",
            label: "Command",
            placeholder: "java -jar myapp.jar",
            validate: "min:2"
          }
        ],
        Testing: [
          {
            name: "description",
            label: "Notes",
            type: "textarea",
            validate: "min:2"
          }
        ],
        Standard: [
          {
            name: "description",
            label: "Notes",
            type: "textarea",
            validate: "min:2"
          }
        ]
      }
    };
  },

  computed: {
    forms() {
      const role = _.get(this, "role");
      return _.get(this.mapper, role, []);
    }
  },

  mounted() {
    this.updaterEdit();
  },

  methods: {
    updaterEdit(data = null) {
      if (!data) data = this.resetData;

      this.$set(this, "data", data);
      this.$set(this, "role", _.get(data, "role", "Application"));
      this.commitChange();
    },

    commitChange() {
      const dpp = _.pickBy(this.data, _.identity);
      this.$emit("update", dpp);
    },

    changeData() {
      this.$set(this.data, "role", this.role);
      this.commitChange();
    },

    reset() {
      this.updaterEdit(null);
    }
  }
};
</script>
