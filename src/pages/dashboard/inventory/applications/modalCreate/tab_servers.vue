<template>
  <div>
    <div id="baseServices">
      <typeahead
        label="Server"
        placeholder="Select ou server"
        async-key="items"
        :async="URL"
        :template="template"
        :on-hit="teamSelected"
        v-validate.initial="'required'"
        v-model="server"
      ></typeahead>

    </div>

    <div class="text-center mt20">
      <button class="btn btn-primary" type="button" name="button" @click.prevent="addServer"
              :disabled="errors.any()"><i class="fa fa-plus-circle"></i> Server
      </button>
    </div>

    <div class="well row mt20">
      <ul v-if="value.length > 0" class="list-group">
        <li class="list-group-item" v-for="stg, i in value" :key="i">
          {{stg.hostname}} <bs-label>{{stg.ipv4_private}}</bs-label>

          <button class="btn btn-danger btn-xs pull-right" @click.prevent="deleteServer(index)"><i
            class="fa fa-trash" aria-hidden="true"></i></button>
        </li>
      </ul>
      <span v-if="value.length <= 0" class="col-xs-12 text-center">None server</span>
      <bs-label v-if="value.length > 0" type="default">{{value.length}} Server<span
        v-if="value.length > 1">s</span></bs-label>
    </div>
  </div>
</template>


<script>
  'use strict'

  export default {

    data: function () {

      return {
        URL: API_URL:
        value: [],
        server: null
      }
    },

    methods: {
      addServer() {
        const tags = _.pickBy(this.server, _.identity)
        const exist = _.find(this.value, ['key', tags.key])

        if(!exist) {
          this.server=null

          this.value.push(tags)
          this.$emit('update', _.get(this, 'value', []))
        }
      },

      deleteServer(key) {
        this.value.splice(key, 1)
        this.$emit('update', _.get(this, 'value', []))
      },

      updaterEdit(data) {
        this.$set(this, 'value', data || [])
      },

      reset() {
        this.server=null
        this.value = []
      }
    }
  }

</script>
