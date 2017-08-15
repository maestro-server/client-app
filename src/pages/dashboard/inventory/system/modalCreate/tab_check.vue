<template>
  <div>
    <div id="baseServices">
      <bs-select form-type="horizontal" :options="types" v-model="system.key" name="type"
                 label="Type*" v-validate.initial="'required'" :error="makeError('type')"></bs-select>

      <bs-input form-type="horizontal" v-model="system.value" name="value" label="Endpoint*"
                v-validate.initial="'required'"></bs-input>
    </div>

    <div class="text-center mt20">
      <button class="btn btn-primary" type="button" name="button" @click.prevent="addSystem"
              :disabled="errors.any()"><i class="fa fa-plus-circle"></i> System
      </button>
    </div>

    <div class="well row mt20">
      <ul v-if="value.length > 0" class="list-group">
        <li class="list-group-item" v-for="stg, i in value" :key="i">
          <bs-label>{{stg.key}}</bs-label>
          - {{stg.value}}

          <button class="btn btn-danger btn-xs pull-right" @click.prevent="deleteSystem(i)"><i
            class="fa fa-trash" aria-hidden="true"></i></button>
        </li>
      </ul>
      <span v-if="value.length <= 0" class="col-xs-12 text-center">None system</span>
      <bs-label v-if="value.length > 0" type="default">{{value.length}} System<span
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
      const systemTemplate = {key: null, value: null}

      return {
        value: [],
        resetSystem: systemTemplate,
        system: _.clone(systemTemplate)
      }
    },

    methods: {
      addSystem() {
        const system = _.pickBy(this.system, _.identity)
        this.$set(this, 'system', _.clone(this.resetSystem))

        this.value.push(system)
        this.$emit('update', _.get(this, 'value', []))
      },

      deleteSystem(key) {
        this.value.splice(key, 1)
        this.$emit('update', _.get(this, 'value', []))
      },

      updaterEdit(data) {
        this.$set(this, 'value', data || [])
      },

      reset() {
        this.$set(this, 'system', _.clone(this.systemTemplate))
        this.value = []
      }
    }
  }

</script>
