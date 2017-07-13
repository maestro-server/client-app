<template>
  <div>
    <div id="baseServices">
      <bs-input form-type="horizontal" v-model="tags.key" name="key" label="Key" data-vv-scope="tags" v-validate.initial="'required'"></bs-input>
      <bs-input form-type="horizontal" v-model="tags.value" name="value" label="Value" data-vv-scope="tags" v-validate.initial="'required'"></bs-input>
    </div>

    <div class="text-center mt20">
      <button class="btn btn-primary" type="button" name="button" @click.prevent="addTags"
              :disabled="errors.any('tags')"><i class="fa fa-plus-circle"></i> Tag
      </button>
    </div>

    <div class="well row mt20">
      <ul v-if="value.length > 0" class="list-group">
        <li class="list-group-item" v-for="stg, index in value" :key="index">
          <bs-label>{{stg.key}}</bs-label> - {{stg.value}}

          <button class="btn btn-danger btn-xs pull-right" @click.prevent="deleteTags(index)"><i
            class="fa fa-trash" aria-hidden="true"></i></button>
        </li>
      </ul>
      <span v-if="value.length <= 0" class="col-xs-12 text-center">None tags</span>
      <bs-label v-if="value.length > 0" type="default">{{value.length}} Tag<span
        v-if="value.length > 1">s</span></bs-label>
    </div>
  </div>
</template>


<script>
'use strict'

export default {

  data: function () {
    return {
      value: [],
      tags: {key:null, value: null}
    }
  },

  methods: {
    addTags() {
      if(this.tags.value) {
        this.value.push(this.tags)
        this.tags = {}
      }
    },

    deleteTags(key) {
      this.value.splice(key, 1)
    }
  }
}

</script>
