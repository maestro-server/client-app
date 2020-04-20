<template>
  <creater-list
:single.sync="single"
:basket="value"
label="Auth"
@update="updaterEdit"
>
<template slot="forms">
<div class="row">
        <div class="col-sm-3 col-xs-12 control-label">
          <label>Auth type</label>
        </div>
        <div class="col-sm-9 col-xs-12">
          <button-group
v-model="single.type"
v-validate.initial="'required'"
type="primary"
name="type"
>
            <bs-radio
v-for="atp in options"
:key="atp"
:selected-value="atp"
>
{{ atp }}
</bs-radio>
          </button-group>
        </div>
      </div>

      <hr>

      <bs-input
v-model="single.name"
form-type="horizontal"
name="name"
label="Key name*"
/>

      <bs-input
v-model="single.username"
class="mt20"
form-type="horizontal"
label="Username"
/>
    </template>

    <template
slot="view"
slot-scope="props"
>
      <bs-label>{{ props.item.type }}</bs-label>
      {{ props.item.username }} <span v-if="props.item.name">({{ props.item.name }})</span>
    </template>
</creater-list>
</template>


<script>
'use strict'

import TabCreaterList from 'mixins/tab-creater-list'

export default {
  mixins: [TabCreaterList],

  props: {
    options: {}
  },

  data: function () {
    return {
      single: { name: null, admin: null, type: null }
    }
  }
}

</script>
