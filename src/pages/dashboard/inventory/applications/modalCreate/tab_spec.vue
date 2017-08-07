<template>
  <div>
    <div>
      <bs-select form-type="horizontal" :options="roles" v-model="deployer.role" name="role"
                 label="Role*" v-validate.initial="'required'"></bs-select>

      <hr>

      <div>
        <h5 class="mt0 text-center">Specification {{deployer.role}}</h5>

        <bs-input class="mt20" form-type="horizontal" name="link" label="Link" v-model="deployer.link"
                  v-validate.initial="'url'" :error="makeError('link')"></bs-input>

        <bs-input class="mt20" form-type="horizontal" name="id" label="Id" v-model="deployer.id"></bs-input>

        <bs-input type="textarea" class="mt20" form-type="horizontal" name="description" label="Descripition" v-model="deployer.description"
        ></bs-input>
      </div>
    </div>

  </div>
</template>


<script>
  'use strict'

  export default {
    props: {
      roles: {}
    },

    data: function () {
      const specTemplate = {role: null, id:null, link: null, description:null}

      return {
        value: [],
        resetDeployer: specTemplate,
        deployer: _.clone(specTemplate)
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
