<template>
  <div>
    <div id="baseServices">
      <bs-select form-type="horizontal" :options="types" v-model="deployer.type" name="type"
                 label="Type*" v-validate.initial="'required'" :error="makeError('type')"></bs-select>

      <bs-input form-type="horizontal" v-model="deployer.link" name="link" label="Link"></bs-input>

      <bs-input type="textarea" class="mt20" form-type="horizontal" name="description" label="Descripition" v-model="deployer.description"
      ></bs-input>
    </div>

    <div class="text-center mt20">
      <button class="btn btn-primary" type="button" name="button" @click.prevent="addDeploy"
              :disabled="errors.any()"><i class="fa fa-plus-circle"></i> Deploy
      </button>
    </div>

    <div class="well row mt20">
      <ul v-if="value.length > 0" class="list-group">
        <li class="list-group-item" v-for="stg, i in value" :key="i">
          <bs-label>{{stg.key}}</bs-label>
          - {{stg.value}}

          <button class="btn btn-danger btn-xs pull-right" @click.prevent="deleteDeployer(index)"><i
            class="fa fa-trash" aria-hidden="true"></i></button>
        </li>
      </ul>
      <span v-if="value.length <= 0" class="col-xs-12 text-center">None deployer</span>
      <bs-label v-if="value.length > 0" type="default">{{value.length}} Deploy<span
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
      const deployerTemplate = {type: null, link: null, description:null}

      return {
        value: [],
        resetDeployer: deployerTemplate,
        deployer: _.clone(deployerTemplate)
      }
    },

    methods: {
      addDeploy() {
        const deployer = _.pickBy(this.deployer, _.identity)

        this.$set(this, 'deployer', _.clone(this.resetDeployer))
        this.value.push(deployer)
        this.$emit('update', _.get(this, 'value', []))
      },

      deleteDeployer(key) {
        this.value.splice(key, 1)
        this.$emit('update', _.get(this, 'value', []))
      },

      updaterEdit(data) {
        this.$set(this, 'value', data || [])
      },

      reset() {
        this.$set(this, 'deployer', _.clone(this.resetDeployer))
        this.value = []
      }
    }
  }

</script>
