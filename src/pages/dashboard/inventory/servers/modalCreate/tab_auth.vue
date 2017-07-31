<template>

  <div>
    <bs-input form-type="horizontal" name="name" label="Key name*" v-model="auth.name" data-vv-scope="auth"
              v-validate.initial="'required'"></bs-input>
    <hr/>
    <div class="row">
      <div class="col-xs-3 text-right mt5">
        <label>Auth type</label>
      </div>
      <div class="col-xs-9">
        <button-group v-model="auth.type" type="primary" data-vv-scope="auth" v-validate.initial="'required'">
          <bs-radio v-for="atp in options" :key="atp" :selected-value="atp">{{atp}}</bs-radio>
        </button-group>
      </div>
    </div>

    <bs-input class="mt20" form-type="horizontal" label="Username*" v-model="auth.username" data-vv-scope="auth"
              v-validate.initial="'required'"></bs-input>

    <div class="row" v-if="auth.type == 'PKI'">
      <div class="col-xs-3 text-right mt5">
        <label>Key File</label>
      </div>
      <div class="col-xs-9" v>
        <button class="btn btn-primary" @click.stop.prevent="showKeyForm = true">Add Key</button>
        <bs-input v-if="showKeyForm" v-model="auth.key" type="textarea" label="Add Key" class="col-xs-12"
                  placeholder="Begins with 'ssh-rsa', 'ssh-dss', 'ssh-ed25519', 'ecdsa-sha2-nistp256', 'ecdsa-sha2-nistp384', or 'ecdsa-sha2-nistp521'"></bs-input>
      </div>
    </div>

    <div v-if="auth.type == 'Password'">
      <bs-input form-type="horizontal" type="password" v-model="auth.password" label="Password"></bs-input>
    </div>

    <div class="text-center mt20">
      <button class="btn btn-primary" type="button" name="button" @click.prevent="addAuth"
              :disabled="errors.any('auth')"><i class="fa fa-plus-circle"></i> Authorization
      </button>
    </div>

    <div class="well row mt20">
      <ul v-if="value.length > 0" class="list-group">
        <li class="list-group-item" v-for="stg, i in value" :key="stg">
          {{stg.name}} -> Type:
          <bs-label>{{stg.type}}</bs-label>
          - Username:
          <bs-label type="default">{{stg.username}}</bs-label>

          <button class="btn btn-danger btn-xs pull-right" @click.prevent="deleteAuth(index)"><i
            class="fa fa-trash" aria-hidden="true"></i></button>
        </li>
      </ul>
      <span v-if="value.length <= 0" class="col-xs-12 text-center">None user</span>
      <bs-label v-if="value.length > 0" type="default">{{value.length}} User<span
        v-if="value.length > 1">s</span></bs-label>
    </div>
  </div>

</template>


<script>
'use strict'

export default {

  props: {
    options: {}
  },

  data: function () {
    return {
      value: [],
      auth: {name: null, admin: null, type: null},
      showKeyForm: false
    }
  },

  methods: {
    addAuth() {
      const auth = _.pickBy(this.auth, _.identity)
      const exist = _.find(this.value, ['name', tags.name])

      if(!exist) {
        this.auth = {}

        this.value.push(auth)
        this.$emit('update', _.get(this, 'value', []))
      }
    },

    deleteAuth(key) {
      this.value.splice(key, 1)
      this.$emit('update', _.get(this, 'value', []))
    }
  }
}

</script>
