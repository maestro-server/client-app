<template>

  <div class="col-xs-12">
  <creater-list :basket="value" :label="label" :showAddBtn="false" @update="updaterEdit">
    <template slot="forms">
      <div class="text-right">
        <router-link :to="{name: relName}" class="btn btn-primary btn-xs" target="_blank">
          <i class="fa fa-plus-circle"></i> {{label}}
        </router-link>
      </div>

      <typeahead :label="label" :placeholder="label"
                 :async="URL"
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
  </div>

</template>

<script>
  'use strict'

  import TabCreaterList from 'mixins/tab-creater-list'
  import Modals from 'mixins/modals'
  import headerLogin from 'src/resources/libs/headerAuthorization'

  export default {
    mixins: [Modals, TabCreaterList],

    props: {
      label: {default: 'Application'},
      defaultType: {default: 'Application'},
      entity: {},
      relName: {}
    },

    data: function () {
      return {
        headers: headerLogin,
        type: "Application",
        URL: `${new this.entity().getUrl()}?query=`,
        template: "<b>{{item.name}}</b>",
        options: {
          role: []
        }
      }
    },

    methods: {
      requestSearch(async, val, key='name') {
        return `${async}%7B"${key}":"${val}"%7D`
      },

      updaterEdit(data) {
        this.$set(this, 'value', data || [])
        const m = data.map(e=>e._id)
        this.$emit('update', m)
      }
    }
  }

</script>
