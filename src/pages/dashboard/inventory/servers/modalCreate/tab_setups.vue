<template>
  <div>
    <div id="baseServices">
      <bs-select form-type="horizontal" :options="options" v-model="service.name" name="name"
                 label="Service" data-vv-scope="service" v-validate.initial="'required'" search></bs-select>
      <bs-input form-type="horizontal" v-model="service.version" name="version" label="Version"></bs-input>
    </div>

    <div class="text-center mt20">
      <button class="btn btn-primary" type="button" name="button" @click.prevent="addServices"
              :disabled="errors.any('service')"><i class="fa fa-plus-circle"></i> Service
      </button>
    </div>

    <div class="well row mt20">
      <ul v-if="value.length > 0" class="list-group">
        <li class="list-group-item" v-for="stg, index in value" :key="index">
          {{stg.name}} <span v-if="stg.version">-></span>
          <bs-label>{{stg.version}}</bs-label>

          <button class="btn btn-danger btn-xs pull-right" @click.prevent="deleteServices(index)"><i
            class="fa fa-trash" aria-hidden="true"></i></button>
        </li>
      </ul>
      <span v-if="value.length <= 0" class="col-xs-12 text-center">None service</span>
      <bs-label v-if="value.length > 0" type="default">{{value.length}} Service<span
        v-if="value.length > 1">s</span></bs-label>
    </div>
  </div>
</template>


<script>
  'use strict'

  export default {

    props: {
      options: {}
    },

    data: function () {
      return {
        value: [],
        service: {service: null, version: null}
      }
    },

    methods: {
      addServices() {
        const svc = _.pickBy(this.service, _.identity)
        const exist = _.find(this.value, ['name', svc.name])

        if(!exist) {
          this.service = {}

          this.value.push(svc)
          this.$emit('update', _.get(this, 'value', []))
        }
      },

      deleteServices(key) {
        this.value.splice(key, 1)
        this.$emit('update', _.get(this, 'value', []))
      }
    }

  }

</script>
