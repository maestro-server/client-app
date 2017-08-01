<template>
  <div>
    <bs-input form-type="horizontal" label="Name" v-model="storage.name" name="name" data-vv-scope="storage"
              v-validate.initial="'required'"
              placeholder="/dev/sda"></bs-input>
    <bs-input form-type="horizontal" label="Size (GB)" v-model="storage.size" name="size" placeholder="500"
              data-vv-scope="storage" v-validate.initial="'numeric'"
              :error="makeError('size', 'storage')"></bs-input>


    <div class="row" id="baseStorage">
      <div class="col-xs-3 text-right mt5">
        <label>Root device</label>
      </div>
      <div class="col-xs-9">
        <button-group v-model="storage.root" type="default">
          <bs-radio selected-value="root">Yes</bs-radio>
          <bs-radio selected-value="">No</bs-radio>
        </button-group>
      </div>
    </div>

    <div class="text-center mt20">
      <button class="btn btn-primary" type="button" name="button" @click="addStorage"
              :disabled="errors.any('storage')"><i class="fa fa-plus-circle"></i> Storage
      </button>
    </div>

    <div class="well row mt20">
      <ul v-if="value.length > 0" class="list-group">
        <li class="list-group-item" v-for="stg, i in value" :key="stg">
          {{stg.name}} -
          <bs-label>{{stg.size}} GB</bs-label>
          <bs-label type="danger" v-if="stg.root == 'root'">root</bs-label>

          <button class="btn btn-danger btn-xs pull-right" @click.stop="deleteStorage(i)"><i
            class="fa fa-trash" aria-hidden="true"></i></button>
        </li>
      </ul>
      <span v-if="value.length <= 0" class="col-xs-12 text-center">None storage</span>
      <bs-label v-if="value.length > 0" type="default">{{value.length}} Storage<span
        v-if="value.length > 1">s</span></bs-label>
    </div>

  </div>
</template>


<script>
  'use strict'

  import _ from 'lodash'

  export default {

    data: function () {
      return {
        value: [],
        storage: {name: null, size: null, root: null}
      }
    },

    methods: {
      addStorage() {
        const stg = _.pickBy(this.storage, _.identity)
        const exist = _.find(this.value, ['name', stg.name])

        if(!exist) {
          this.storage = {}

          this.value.push(stg)
          this.$emit('update', _.get(this, 'value', []))
        }
      },

      deleteStorage(key) {
        this.value.splice(key, 1)
        this.$emit('update', _.get(this, 'value', []))
      }
    }

  }

</script>
