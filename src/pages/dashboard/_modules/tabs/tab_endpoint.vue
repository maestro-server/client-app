<template>
  <creater-list :single.sync="single" :basket="value" label="Endpoints" @update="updaterEdit">

    <template slot="forms">
      <bs-select form-type="horizontal" :options="types" v-model="single.endpoint" name="type"
                 label="Type*" v-validate.initial="'required'" :error="makeError('type')"></bs-select>

      <typeahead label="Application"
                 placeholder="MyWebApp"
                 :async="URL"
                 async-key="items"
                 :onSearch="requestSearch"
                 :template="template"
                 :on-hit="onHit"
                 form-type="horizontal"
                 :headers="headers"
                 v-model="single.app"
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
      types: {}
    },

    data: function () {
      return {
        URL: `${new Applications().getUrl()}?query=`,
        template: "<b>{{item.name}}</b> <span v-if='item.environment'>({{item.environment}})</span> <h5 class='ft15 inline'><bs-label type='default' v-if='item.role'>{{item.role.role}}</bs-label></h5>",
        headers: headerLogin,
        single: {app:null, endpoint: null, _id: null, family: null, name: null}
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
        const m = data.map(e=>e._id)
        this.$emit('update', m)
      }
    }
  }

</script>
