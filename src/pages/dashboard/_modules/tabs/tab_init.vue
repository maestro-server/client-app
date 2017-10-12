<template>
  <div class="row">

    <div class="col-xs-12">
      <bs-select form-type="horizontal" :options="managers" v-model="data.init" name="init" clear-button
                 label="Init System" @input="onHit"></bs-select>
      <hr>
      <bs-input class="mt10" form-type="horizontal"
                name="start" label="Start Cmd" v-model="data.start" placeholder="systemctl httpd start" @blur="onHit"></bs-input>

      <bs-input class="mt10" form-type="horizontal"
                name="stop" label="Stop Cmd" v-model="data.stop" placeholder="systemctl httpd stop" @blur="onHit"></bs-input>

      <bs-input class="mt10" form-type="horizontal"
                name="restart" label="Restart Cmd" v-model="data.restart" placeholder="systemctl httpd restart" @blur="onHit"></bs-input>
    </div>

  </div>
</template>


<script>
  'use strict'

  import TabCreaterList from 'mixins/tab-creater-list'

  export default {
    mixins: [TabCreaterList],

    props: {
      managers: {}
    },

    data: function () {
      const resetData = {init: null, start:null, stop: null, restart:null}

      return {
        resetData: resetData,
        data: _.clone(resetData),
        options: {
          managers: []
        }
      }
    },

    methods: {
      onHit() {
        this.$emit('update', this.data)
      },

      updaterEdit(data = {}) {
        this.$set(this, 'data', data)
        const dpp = _.pickBy(data, _.identity)

        this.$emit('update', dpp)
      },

      reset() {
        this.$set(this, 'data', _.clone(this.resetData))
      }
    },

    mounted () {
      this.updaterEdit()
    }

  }

</script>
