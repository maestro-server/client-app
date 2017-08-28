<template>
  <div>
    <div>
      <bs-select form-type="horizontal" :options="roles" v-model="deployer.role" name="role"
                 label="Role*" v-validate.initial="'required'" @selected="updaterValue"></bs-select>
      <hr>

      <h5 class="mt0 text-center" v-if="deployer.role">{{deployer.role}} specification</h5>

      <div v-if="deployer.role == 'Application'">
        <bs-input class="mt20" form-type="horizontal" name="endpoint" label="Endpoint" v-model="deployer.endpoint"
                  v-validate.initial="'url'" :error="makeError('endpoint')" @blur="updaterValue"></bs-input>

        <bs-input form-type="horizontal" name="path" label="Code Path" v-model="deployer.path" placeholder="/var/www/myapp" @blur="updaterValue"></bs-input>

        <bs-input form-type="horizontal" name="code" label="Command" v-model="deployer.command" placeholder="java -jar myapp.jar" @blur="updaterValue"></bs-input>

        <bs-input type="textarea" form-type="horizontal" name="description" label="Notes" v-model="deployer.notes" @blur="updaterValue"></bs-input>
      </div>

      <div v-if="deployer.role == 'Worker'">
        <bs-input form-type="horizontal" name="path" label="Code Path" v-model="deployer.path" placeholder="/var/www/myapp" @blur="updaterValue"></bs-input>

        <bs-input form-type="horizontal" name="code" label="Command" v-model="deployer.command" placeholder="java -jar myapp.jar" @blur="updaterValue"></bs-input>
      </div>

      <div v-if="deployer.role == 'LoadBalance'">
        <bs-input class="mt20" form-type="horizontal" name="name" label="Name" v-model="deployer.name" @blur="updaterValue"></bs-input>

        <bs-input class="mt20" form-type="horizontal" name="endpoint" label="Endpoint" v-model="deployer.endpoint"
                  v-validate.initial="'url'" :error="makeError('endpoint')" @blur="updaterValue"></bs-input>
      </div>

      <div v-if="deployer.role == 'Jobs'">
        <bs-input form-type="horizontal" name="cron" label="Cron" v-model="deployer.cron" placeholder="12 * * * *" @blur="updaterValue"></bs-input>

        <bs-input form-type="horizontal" name="path" label="Code Path" v-model="deployer.path" placeholder="/var/www/myapp" @blur="updaterValue"></bs-input>

        <bs-input form-type="horizontal" name="code" label="Command" v-model="deployer.command" placeholder="java -jar myapp.jar" @blur="updaterValue"></bs-input>
      </div>

      <div v-if="deployer.role == 'Service Discovery'">
        <bs-input class="mt20" form-type="horizontal" name="name" label="Name" v-model="deployer.name" @blur="updaterValue"></bs-input>

        <bs-input class="mt20" form-type="horizontal" name="endpoint" label="Endpoint" v-model="deployer.endpoint"
                  v-validate.initial="'url'" :error="makeError('endpoint')" @blur="updaterValue"></bs-input>
      </div>

      <div v-if="deployer.role == 'Monitoring'">
        <bs-input class="mt20" form-type="horizontal" name="name" label="Name" v-model="deployer.name" @blur="updaterValue"></bs-input>

        <bs-input class="mt20" form-type="horizontal" name="endpoint" label="Endpoint" v-model="deployer.endpoint"
                  v-validate.initial="'url'" :error="makeError('endpoint')" @blur="updaterValue"></bs-input>
      </div>

      <div v-if="deployer.role == 'Testing'">
        <bs-input type="textarea" form-type="horizontal" name="description" label="Notes" v-model="deployer.notes" @blur="updaterValue"></bs-input>
      </div>

      <div v-if="deployer.role == 'Standard'">

        <bs-input type="textarea" form-type="horizontal" name="description" label="Notes" v-model="deployer.notes" @blur="updaterValue"></bs-input>
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
      const resetDeployer = {role:null, name: null, id:null, link: null, notes:null}

      return {
        resetDeployer: resetDeployer,
        deployer: _.clone(resetDeployer)
      }
    },

    methods: {
      updaterValue() {
        const dpp = _.pickBy(this.deployer, _.identity)

        this.$emit('update', dpp)
      },

      updaterEdit(data) {
        this.deployer = _.assign({},this.resetDeployer,data)
      },

      reset() {
        this.$set(this, 'deployer', _.clone(this.resetDeployer))
      }
    }
  }

</script>
