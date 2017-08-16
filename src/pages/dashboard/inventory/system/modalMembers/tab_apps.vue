<template>
  <div>
    <div class="row">
      <div class="col-xs-12">
        <p>Insert all components of your system, applications, database, cache servers and more.</p>
        <div class="col-xs-5">
          <bs-select :options="types" v-model="type" name="type"
                     label="Component" v-validate.initial="'required'" :error="makeError('type')"></bs-select>

        </div>

        <div class="col-xs-7">
          <typeahead
            label="Application"
            placeholder="MyWebApp"
            :async="URL"
            async-key="items"
            :onSearch="requestSearch"
            :template="template"
            :on-hit="onHit"
            class="col-xs-12"
          ></typeahead>
        </div>
      </div>

    </div>

    <div class="well row mt20">

      <ul v-if="value.length > 0" class="list-group">
        <li class="list-group-item row" v-for="item, i in value" :key="i">
          <div class="col-xs-10">
            <b class="text-capitalize">{{item.name}}</b> <span v-if='item.environment'>({{item.environment}})</span>
            <h5 class='ft15 inline'>
              <bs-label type='default' v-if='item.spec'>{{item.spec.role}}</bs-label>
            </h5>
          </div>

          <button class="btn btn-danger btn-xs pull-right" @click.prevent="deleteApp(i)"><i
            class="fa fa-trash" aria-hidden="true"></i></button>
        </li>
      </ul>
      <span v-if="value.length <= 0" class="col-xs-12 text-center">None app selected</span>
      <bs-label v-if="value.length > 0" type="default">{{value.length}} Application<span
        v-if="value.length > 1">s</span></bs-label>
    </div>
  </div>
</template>

<style>
  .ft15 {
    font-size:15px;
  }
</style>


<script>
  'use strict'

  export default {

    props: {
      types: {}
    },

    data: function () {

      return {
        URL: `${API_URL}/applications?query=`,
        type: "Application",
        value: [],
        clearValue: [],
        template: "<b>{{item.name}}</b> <span v-if='item.environment'>({{item.environment}})</span> <h5 class='ft15 inline'><bs-label type='default' v-if='item.spec'>{{item.spec.role}}</bs-label></h5>"
      }
    },

    methods: {
      requestSearch(async, val, key='name') {
        return `${async}%7B"${key}":"${val}", "family":"${this.type}"%7D`
      },

      onHit(item) {
        const exist = _.find(this.value, ['_id', item._id])

        if (!exist) {
          this.value.push(item)
          this.emitUpdate(this.value)
        }
      },

      deleteApp(key) {
        this.value.splice(key, 1)
        this.emitUpdate(this.value)
      },

      updaterEdit(data) {
        this.$set(this, 'value', data || [])
        this.emitUpdate(this.value)
      },

      reset() {
        this.value = []
      },

      emitUpdate(data) {
        const m = data.map(e=>e._id)
        this.$emit('update', m)
      }
    }
  }

</script>
