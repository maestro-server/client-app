<template>
  <div>
    <div id="baseServices"><typeahead
      label="Channel"
      placeholder="Email, Hipchat"
      :data="types"
      v-model="channels.channel"
      v-validate.initial="'required'"
      form-type="horizontal"
    ></typeahead>

      <bs-input form-type="horizontal" v-model="channels.value" name="value" label="Value"
                v-validate.initial="'required'"></bs-input>
    </div>

    <div class="text-center mt20">
      <button class="btn btn-primary" type="button" name="button" @click.prevent="addChannels"
              :disabled="errors.any()"><i class="fa fa-plus-circle"></i> Channel
      </button>
    </div>

    <div class="well row mt20">
      <ul v-if="value.length > 0" class="list-group">
        <li class="list-group-item" v-for="stg, i in value" :key="i">
          <bs-label>{{stg.channel}}</bs-label>
          - {{stg.value}}

          <button class="btn btn-danger btn-xs pull-right" @click.prevent="deleteChannels(i)"><i
            class="fa fa-trash" aria-hidden="true"></i></button>
        </li>
      </ul>
      <span v-if="value.length <= 0" class="col-xs-12 text-center">None channels</span>
      <bs-label v-if="value.length > 0" type="default">{{value.length}} Channel<span
        v-if="value.length > 1">s</span></bs-label>
    </div>
  </div>
</template>


<script>
  'use strict'

  export default {
    props: {
      types: {}
    },

    data: function () {
      const channelTemplate = {channel: null, value: null}

      return {
        value: [],
        resetChannel: channelTemplate,
        channels: _.clone(channelTemplate)
      }
    },

    methods: {
      addChannels() {
        const channels = _.pickBy(this.channels, _.identity)
        this.$set(this, 'channels', _.clone(this.resetChannel))

        this.value.push(channels)
        this.$emit('update', _.get(this, 'value', []))
      },

      deleteChannels(key) {
        this.value.splice(key, 1)
        this.$emit('update', _.get(this, 'value', []))
      },

      updaterEdit(data) {
        this.$set(this, 'value', data || [])
      },

      reset() {
        this.$set(this, 'channels', _.clone(this.resetChannel))
        this.value = []
      }
    }
  }

</script>
