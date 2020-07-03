<template>
  <creater-list
    :single.sync="single"
    :basket="value"
    label="Storage"
    :show-add-btn="tabShow != 0"
    @update="updaterEdit"
  >
    <template slot="forms">
      <tabs
        v-model="tabShow"
        nav-style="pills"
        justified
      >
        <tab header="Attached">
          <h4 class="col-xs-12">
            Attached Volumes
          </h4>

          <div class="col-xs-6">
            <typeahead
              label="Search by name"
              placeholder="maestro-volume"
              :async="URL_VOLUME"
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
              label="Search by Unique ID"
              placeholder="vol-YGSf67GSUSD8"
              :async="URL_VOLUME"
              async-key="items"
              :on-search="requestIDSearch"
              :template="template"
              :on-hit="onHit"
              class="col-xs-12"
              :headers="headers"
            />
          </div>
          <div class="col-xs-12 hidden-xs">
            <router-link
              :to="{name: 'volumes'}"
              class="btn btn-primary btn-xs pull-right"
              target="_blank"
            >
              <i class="fa fa-plus-circle"/> Create Volume
            </router-link>
          </div>
        </tab>

        <tab header="Built-In">
          <h4 class="col-xs-12">
            Built-In Volumes
          </h4>

          <div class="col-xs-12">
            <bs-input
              v-model="single.name"
              v-validate.initial="'required'"
              class="mt10"
              form-type="horizontal"
              label="Mount"
              name="mount"
              placeholder="/dev/sda"
            />

            <bs-input
              v-model="single.size"
              v-validate.initial="'required|decimal'"
              type="number"
              form-type="horizontal"
              label="Size (GB)"
              name="size"
              placeholder="500"
            />

            <div
              id="baseStorage"
              class="row"
            >
              <div class="col-sm-3 col-xs-12 control-label">
                <label>Root device</label>
              </div>
              <div class="col-sm-9 col-xs-12">
                <button-group
                  v-model="single.root"
                  type="default"
                >
                  <bs-radio selected-value="root">
                    Yes
                  </bs-radio>
                  <bs-radio selected-value="secondary">
                    No
                  </bs-radio>
                </button-group>
              </div>
            </div>
          </div>
        </tab>
      </tabs>
    </template>

    <template
      slot="view"
      slot-scope="props"
    >
      {{ props.item.name }} -
      <bs-label v-if="props.item.size">
        {{ props.item.size }} GB
      </bs-label>
      <bs-label
        v-if="props.item.root == 'root'"
        type="danger"
      >
        root
      </bs-label>
      <bs-label v-if="props.item.unique_id">
        Attached
      </bs-label>
      <bs-label v-if="!props.item.unique_id">
        Built-In
      </bs-label>
      <bs-label
        v-if="props.item.unique_id"
        type="default"
      >
        {{ props.item.unique_id }}
      </bs-label>
    </template>
  </creater-list>
</template>


<script>
'use strict'

import TabCreaterList from 'mixins/tab-creater-list'
import Volumes from 'factories/volumes'
import headerLogin from 'src/resources/libs/headerAuthorization'

export default {
  mixins: [TabCreaterList],

  data: function () {
    return {
      tabShow: 0,
      headers: headerLogin,
      URL_VOLUME: `${new Volumes().getUrl()}?query=`,
      template: '<b>{{item.name}}</b>',
      advanced: false,
      single: {
        name: null,
        size: null,
        root: null
      },
      filter: ['name', 'unique_id']
    }
  },

  methods: {
    requestIDSearch (async, val) {
      return this.requestSearch(async, val, 'unique_id')
    },

    requestSearch (async, val, key = 'name') {
      return `${async}%7B"${key}":"${val}"%7D`
    }
  }
}
</script>
