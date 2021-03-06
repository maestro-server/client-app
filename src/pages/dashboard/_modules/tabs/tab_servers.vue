<template>
  <creater-list :basket="value" :label="label" :show-add-btn="false" @update="updaterEdit">
    <template slot="forms">
      <p class="col-xs-12">
        <slot
          name="label"
        >List all servers belongs to application, using the form below to search in servers.</slot>
      </p>

      <div class="col-xs-6">
        <typeahead
          label="Search by Hostname"
          placeholder="back0100"
          :async="URL"
          async-key="items"
          :on-search="requestSearch"
          :template="template"
          :on-hit="onHit"
          class="col-xs-12"
          :headers="headers"
        />
      </div>

      <div class="col-xs-6">
        <typeahead
          label="Search by Private IP"
          placeholder="10.150.0.0"
          :async="URL"
          async-key="items"
          :on-search="requestIpSearch"
          :template="template"
          :on-hit="onHit"
          class="col-xs-12"
          :headers="headers"
        />
      </div>

      <div v-if="family" class="col-xs-12">
        <bs-checkbox
          v-model="filter"
          class="small pull-right"
        >Show only server with role {{ family }}</bs-checkbox>
      </div>
    </template>

    <template slot="view" slot-scope="props">
      <b class="text-capitalize">{{ props.item.name }}</b>
      <span v-if="props.item.os && props.item.os.base">({{ props.item.os.base }})</span>
      <span v-if="props.item.datacenters">- {{ props.item.datacenters.name }}</span>
      <br>
      <span class="ft15">
        <bs-label type="default">{{ props.item.ipv4_private }}</bs-label>
        <bs-label type="default">{{ props.item.ipv4_public }}</bs-label>
        <bs-label type="success">{{ props.item.role }}</bs-label>
        <bs-label type="success">{{ props.item.environment }}</bs-label>
      </span>
    </template>

    <small slot="footer" class="pull-right">
      <slot
        name="footer"
      >List all servers which that app stay, don't put dbs, cache, lbs or storage object</slot>
    </small>
  </creater-list>
</template>

<script>
"use strict";

import TabCreaterList from "mixins/tab-creater-list";
import Servers from "factories/servers";
import headerLogin from "src/resources/libs/headerAuthorization";

export default {
  mixins: [TabCreaterList],

  props: {
    family: {},
    label: { default: "Server" }
  },

  data: function () {
    return {
      headers: headerLogin,
      filter: true,
      URL: `${new Servers().getUrl()}?query=`,
      template:
        "<b>{{item.name}}</b> <span v-if='item.os && item.os.base'>({{item.os.base}})</span> <span v-if='item.datacenters.name'> - {{item.datacenters.name}}</span><br/> " +
        "<h5 class='ft15'><bs-label type='default'>{{item.ipv4_private}}</bs-label> <bs-label type='default'>{{item.ipv4_public}}</bs-label> <bs-label type='success'>{{item.role}}</bs-label> <bs-label type='success'>{{item.environment}}</bs-label></h5>"
    };
  },

  methods: {
    requestIpSearch (async, val) {
      return this.requestSearch(async, val, "ipv4_private");
    },

    requestSearch (async, val, key = "name") {
      const role = this.makeFilter();
      return `${async}%7B"${key}":"${val}"${role}%7D`;
    },

    makeFilter () {
      return this.family && this.filter ? `, "role":"${this.family}"` : "";
    },

    updaterEdit (data) {
      this.$set(this, "value", data || []);
      const m = data.map(e => e._id);
      this.$emit("update", m);
    }
  }
};
</script>
