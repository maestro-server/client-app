<template>
  <div>
    <bs-select form-type="horizontal" :options="roles" v-model="role" name="role"
               label="Role" @selected="changeData"></bs-select>
    <hr>

    <h5 class="mt0 text-center" v-if="role">{{role}} specification</h5>

    <template v-for="form in forms">
      <bs-input class="mt20"
                form-type="horizontal"
                :name="form.name"
                :label="form.label"
                :type="form.type"
                v-model="data[form.name]"
                v-validate.initial="form.validate"
                :error="makeError(form.name)"
                @blur="updaterEdit"
      ></bs-input>
    </template>

  </div>
</template>


<script>
  'use strict'
  import _ from 'lodash'

  export default {
    props: {
      roles: {}
    },

    data: function () {
      const resetData = {role:null, name: null, id:null, link: null, notes:null}

      return {
        role: 'Application',
        resetData: resetData,
        data: _.clone(resetData),
        mapper: {
          'Application': [
            {name: 'endpoint', label: 'Endpoint', validate: 'url'},
            {name: 'path', label: 'Code Path', placeholder: '/var/www/myapp', validate: 'min:2'},
            {name: 'code', label: 'Command', placeholder: 'java -jar myapp.jar', validate: 'min:2'},
            {name: 'description', label: 'Notes', type: 'textarea', validate: 'min:2'}
          ],
          'Worker': [
            {name: 'path', label: 'Code Path', placeholder: '/var/www/myapp', validate: 'min:2'},
            {name: 'code', label: 'Command', placeholder: 'java -jar myapp.jar', validate: 'min:2'}
          ],
          'Jobs': [
            {name: 'cron', label: 'Cron', placeholder: '12 * * * *', validate: 'min:9'},
            {name: 'path', label: 'Code Path', placeholder: '/var/www/myapp', validate: 'min:2'},
            {name: 'code', label: 'Command', placeholder: 'java -jar myapp.jar', validate: 'min:2'}
          ],
          'Testing': [
            {name: 'description', label: 'Notes', type: 'textarea', validate: 'min:2'}
          ],
          'Standard': [
            {name: 'description', label: 'Notes', type: 'textarea', validate: 'min:2'}
          ]
        }
      }
    },

    computed: {
      forms() {
        const role = _.get(this, 'role')
        return _.get(this.mapper, role, [])
      }
    },

    methods: {
      updaterEdit() {
        _.set(this.data, 'role', this.role)
        const dpp = _.pickBy(this.data, _.identity)

        this.$emit('update', dpp)
      },

      changeData() {
        this.updaterEdit()
        this.reset()
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
