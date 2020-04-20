<template>
  <div class="col-xs-12">
    <creater-list
      :basket="value"
      :label="label"
      :show-add-btn="false"
      @update="updaterEdit"
    >
      <template slot="forms">
        <slot name="label">
          <p>Insert all components of your system, applications, database, cache servers and more.</p>
        </slot>
        <div class="col-sm-5 col-xs-12">
          <bs-select
            v-model="type"
            v-validate.initial="'required'"
            :options="options.families"
            name="type"
            label="Component"
            :error="makeError('type')"
          />
        </div>

        <div class="col-sm-7 col-xs-12">
          <typeahead
            :label="label"
            placeholder="MyWebApp"
            :async="URL"
            async-key="items"
            :on-search="requestSearch"
            :template="template_apps"
            :on-hit="onHit"
            class="col-xs-12"
            :headers="headers"
          />
        </div>
      </template>

      <template
        slot="view"
        slot-scope="props"
      >
        <b class="text-capitalize">{{ props.item.name }}</b> <span v-if="props.item.environment">({{ props.item.environment }})</span>
        <span class="ft15 inline">
            <bs-label
              v-if="props.item.role"
              type="default"
            >{{ props.item.role.role }}</bs-label>
          </span>
      </template>
    </creater-list>
  </div>
</template>

<script>
'use strict'

import Applications from 'factories/applications'
import Adminer from 'factories/adminer'
import headerLogin from 'src/resources/libs/headerAuthorization'
import FectherEntity from 'services/fetchEntity'

import Modals from 'mixins/modals'
import TabCreaterList from 'mixins/tab-creater-list'

export default {
  mixins: [Modals, TabCreaterList],

  data () {
    return {
      headers: headerLogin,
      URL: `${new Applications().getUrl()}?query=`,
      label: Applications.ename,
      options: {
        families: []
      },
      type: 'Application',
      template_apps: '<b>{{item.name}}</b> <span v-if=\'item.environment\'>({{item.environment}})</span> <h5 class=\'ft15 inline\'><bs-label type=\'default\' v-if=\'item.role\'>{{item.role.role}}</bs-label></h5>',
      filter: ['_id', 'name', 'family', 'environment']
    }
  },

  created () {
    this.fetchData()
  },

  methods: {
    requestSearch (async, val, key = 'name') {
      return `${async}%7B"${key}":"${val}", "family":"${this.type}"%7D`
    },

    updaterEdit (data) {
      this.$set(this, 'value', data || [])
      this.$emit('update', data)
    },

    fetchData () {
      FectherEntity(Adminer)({ persistence: 'local' })
        .find(this.fetchAdminer, { key: 'application_options' })
    }
  }

}

</script>
