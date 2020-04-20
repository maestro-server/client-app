<template>
  <div class="dp-wrapper">
    <div class="dp-lines-t" :style="wLine"></div>

    <div class="dp-row">
      <div
        class="dp-item text-center"
        :class="{'dp-select': app._id == selected}"
        @click="addItem(app._id)"
        v-for="app, k in apps"
        :key="app._id"
      >
        <h5>{{app.name}}</h5>
        <p v-if="app.endpoint">
          <span class="dst">{{app.endpoint}}</span>
        </p>
        <p v-if="app.environment">
          <span class="dst">{{app.environment}}</span>
        </p>
        <p v-if="app.family">
          <span class="dst">{{app.family}}</span>
        </p>

        <a class="more more-del" @click.stop.prevent="delItem(app._id)">X</a>
      </div>

      <well class="bg-white" v-if="apps.length == 0">Select the first dependency</well>
    </div>

    <bs-label type="default" class="pull-right mt5">{{step}}</bs-label>

    <div class="dp-lines-b" :style="wLine"></div>

    <popover effect="scale" placement="top" title="Add Dependecy" ref="pop" @toggle="singleOpen">
      <template slot="content">
        <typeahead
          label
          placeholder="MyWebApp"
          :async="URL"
          async-key="items"
          :onSearch="requestSearch"
          :template="template"
          :on-hit="onHit"
          class="col-xs-12"
          :headers="headers"
        ></typeahead>

        <div v-if="app._id" class="col-xs-12 pb10">
          <span class="btn btn-primary btn-large col-xs-12 text-right bkline">
            {{app.name}}
            <br>
            <label class="label label-info">{{app.family}}</label>
            <label class="label label-info">{{app.environment}}</label>
          </span>
        </div>

        <bs-select
          :options="types"
          v-model="endpoint"
          name="type"
          placeholder="Protocol"
          class="col-xs-12"
          v-if="this.step > 0 "
        ></bs-select>

        <div class="col-xs-12 text-center pb10">
          <button class="btn btn-primary" @click.stop="onCommit">Add Dep</button>
        </div>

        <hr>
      </template>

      <a class="more more-right">+</a>
    </popover>
  </div>
</template>

<script>
"use strict";

import _ from "lodash";
import Applications from "factories/applications";
import headerLogin from "src/resources/libs/headerAuthorization";

export default {
  props: {
    step: { type: Number, default: 0 },
    parent_id: { type: String },
    apps: { type: Array, default: () => [] },
    types: { type: Array, default: () => [] }
  },

  data: function () {
    return {
      type: "Application",
      URL: `${new Applications().getUrl()}?query=`,
      template:
        "<b>{{item.name}}</b> <span v-if='item.environment'>({{item.environment}})</span> <h5 class='ft15 inline'><bs-label type='default' v-if='item.role'>{{item.role.role}}</bs-label></h5>",
      headers: headerLogin,
      bags: [],
      app: {},
      selected: null,
      endpoint: null,
      options: {
        protocol: []
      }
    };
  },

  computed: {
    wLine () {
      const wid = this.apps.length ? (this.apps.length - 1) * 120 + 2 : 0;
      return `width: ${wid}px`;
    }
  },

  methods: {
    addItem (id) {
      this.$emit("addRow", id, this.step);
      this.$set(this, "selected", id);
    },

    delItem (id) {
      this.$emit("deleteItem", id, this.step);

      if (id === this.selected) {
        this.$emit("deleteRow", this.step + 1);
      }
    },

    requestSearch (async, val, key = "name") {
      return `${async}%7B"${key}":"${val}"%7D`;
    },

    onHit (item) {
      const app = _.pick(item, ["_id", "name", "family", "environment"]);
      this.$set(this, "app", app);
    },

    onCommit () {
      if (_.has(this.app, "_id")) {
        const tapp = _.assign(this.app, { endpoint: this.endpoint });
        this.$emit("commitItem", tapp, this.step);
        this.$refs.pop.toggle();
        this.clear();
      }
    },

    singleOpen (state) {
      if (state) {
        this.$parent.activedPopover(this.step);
      }
    },

    clear () {
      this.app = {};
      this.endpoint = null;
    }
  },

  created () {
    this.$set(this, "bags", this.apps);
  }
};
</script>

<style>
.bkline {
  overflow: hidden;
  word-wrap: break-word;
}
</style>
