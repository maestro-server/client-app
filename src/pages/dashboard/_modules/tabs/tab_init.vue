<template>
  <div class="row">
<div class="col-xs-12">
      <bs-select
v-model="data.init"
form-type="horizontal"
:options="managers"
name="init"
clear-button
                 label="Init System"
@input="onHit"
/>
      <hr>
      <bs-input
v-model="data.start"
class="mt10"
                form-type="horizontal"
name="start"
label="Start Cmd"
placeholder="systemctl httpd start"
@blur="onHit"
/>

      <bs-input
v-model="data.stop"
class="mt10"
                form-type="horizontal"
name="stop"
label="Stop Cmd"
placeholder="systemctl httpd stop"
@blur="onHit"
/>

      <bs-input
v-model="data.restart"
class="mt10"
                form-type="horizontal"
name="restart"
label="Restart Cmd"
placeholder="systemctl httpd restart"
@blur="onHit"
/>
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

    mounted () {
      this.updaterEdit()
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
    }

  }

</script>
