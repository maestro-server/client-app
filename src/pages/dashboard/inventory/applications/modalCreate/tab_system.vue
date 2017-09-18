<template>

  <creater-list :basket="value" label="System" :showAddBtn="false" @update="updaterEdit">

    <template slot="forms">
      <div class="text-right">
        <router-link :to="{name: 'system'}" class="btn btn-primary btn-xs" target="_blank">
          <i class="fa fa-plus-circle"></i> System
        </router-link>
      </div>

      <typeahead label="System" placeholder="System name"
                 :async="URL_SYSTEM"
                 async-key="items"
                 :onSearch="requestSearch"
                 :template="template"
                 form-type="horizontal"
                 :on-hit="onHit"
                 class="mt10"
      ></typeahead>
    </template>

    <template slot="view" scope="props">
      <b class="text-capitalize">{{props.item.name}}</b> <span v-if='props.item.environment'>({{props.item.environment}})</span>
      <span class='ft15 inline'>
        <bs-label type='default' v-if='props.item.role'>{{props.item.role.role}}</bs-label>
      </span>
    </template>

  </creater-list>

</template>


<script>
  'use strict'

  import TabCreaterList from 'mixins/tab-creater-list'

  export default {
    mixins: [TabCreaterList],

    data: function () {
      return {
        URL_SYSTEM: `${API_URL}system?query=`,
        template: "<b>{{item.name}}</b>",
      }
    },

    methods: {
      requestSearch(async, val, key='name') {
        return `${async}%7B"${key}":"${val}"%7D`
      }
    }
  }
</script>
