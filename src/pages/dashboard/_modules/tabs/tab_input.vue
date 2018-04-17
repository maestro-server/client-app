<template>
  <div>

    <template v-for="form, i in mapper" v-key="i">
      <bs-input class="mt20" form-type="horizontal"
                :name="form.name"
                :label="form.label"
                v-model="data[form.name]"
                :type="form.type"
                v-validate.initial="form.validate"
                :error="makeError(form.name)"
                @blur="onHit"
      ></bs-input>
    </template>

  </div>
</template>


<script>
  'use strict'
  import _ from 'lodash'


  export default {
    props: {
      mapper: {}
    },

    data: function () {
      const resetData = {name: null, id:null, link: null, notes:null}

      return {
        resetData: resetData,
        data: _.clone(resetData)
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
  }

</script>
