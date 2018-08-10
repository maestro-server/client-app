<template>
  <creater-list :single.sync="single" :basket="value" :label="label" @update="updaterEdit" fielder="dps">

    <template slot="forms">
       <slot name="label">
        <p>You can insert all types of applications, like databases, cache servers, brokers and more.</p>
      </slot>

      <hr>

      <bs-select form-type="horizontal" :options="types" v-model="single.endpoint" name="type"
                 label="Protocol*" v-validate.initial="'required'" :error="makeError('type')"></bs-select>

      <typeahead :label="label"
                 placeholder="MyWebApp"
                 :async="URL"
                 async-key="items"
                 :onSearch="requestSearch"
                 :template="template"
                 :on-hit="onHit"
                 form-type="horizontal"
                 :headers="headers"
                 v-model="single.name"
                 v-validate.initial="'required'"
                 :error="makeError('application')"
      ></typeahead>

    </template>

    <template slot="view" slot-scope="props">
      {{props.item.endpoint}} of <b>{{props.item.name}}</b> <br>
      <bs-label>{{props.item.family}}</bs-label>
      <bs-label>{{props.item.endpoint}}</bs-label>
      <bs-label>{{props.item.environment}}</bs-label>
    </template>

  </creater-list>
</template>


<script>
  'use strict'
  import TabCreaterList from 'mixins/tab-creater-list'
  import Applications from 'factories/applications'
  import headerLogin from 'src/resources/libs/headerAuthorization'

  export default {
    mixins: [TabCreaterList],

    props: {
      types: {},
      label: {default: 'Application'}
    },

    data: function () {
      return {
        URL: `${new Applications().getUrl()}?query=`,
        template: "<b>{{item.name}}</b> <span v-if='item.environment'>({{item.environment}})</span> <h5 class='ft15 inline'><bs-label type='default' v-if='item.role'>{{item.role.role}}</bs-label></h5>",
        headers: headerLogin,
        single: {endpoint: null, _id: null, family: null, name: null}
      }
    },

    methods: {
      onHit(item) {
        const app = _.pick(item, ['_id', 'name', 'family', 'environment'])
        _.assign(this.single, app)
        return item.name
      },

      requestSearch(async, val, key = 'name') {
        return `${async}%7B"${key}":"${val}"%7D`
      },

      updaterEdit(data) {
        this.$set(this, 'value', data || [])
        data = _.uniqBy(data, (e) => e.name + e.endpoint)
        this.$emit('update', data)
      }
    }
  }

</script>
