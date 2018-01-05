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
                 :headers="headers"
      ></typeahead>
    </template>

    <template slot="view" slot-scope="props">
      <b class="text-capitalize">{{props.item.name}}</b>
    </template>

  </creater-list>

</template>


<script>
  'use strict'

  import TabCreaterList from 'mixins/tab-creater-list'
  import System from 'factories/system'
  import headerLogin from 'src/resources/libs/headerAuthorization'

  export default {
    mixins: [TabCreaterList],

    data: function () {
      return {
        headers: headerLogin,
        URL_SYSTEM: `${new System().getUrl()}?query=`,
        template: "<b>{{item.name}}</b>",
        filter: ['_id', 'name']
      }
    },

    methods: {
      requestSearch(async, val, key='name') {
        return `${async}%7B"${key}":"${val}"%7D`
      }
    }
  }
</script>
