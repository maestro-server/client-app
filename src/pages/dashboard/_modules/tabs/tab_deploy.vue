<template>
<creater-list
:single.sync="single"
:basket="value"
label="Deploy"
fielder="key"
@update="updaterEdit"
>
<template slot="forms">
      <bs-select
v-model="single.type"
v-validate.initial="'required'"
form-type="horizontal"
:options="types"
                 name="type"
label="Type*"
:error="makeError('type')"
/>

      <bs-input
v-model="single.provider"
form-type="horizontal"
name="provider"
label="Provider"
/>

      <bs-input
v-model="single.notes"
type="textarea"
class="mt20"
form-type="horizontal"
name="description"
label="Notes"
/>
    </template>

    <template
slot="view"
slot-scope="props"
>
      {{ props.item.type }} <bs-label>{{ props.item.provider }}</bs-label>
    </template>
</creater-list>
</template>


<script>
'use strict'

import TabCreaterList from 'mixins/tab-creater-list'

export default {
  mixins: [TabCreaterList],

  props: {
    types: {}
  },

  data: function () {
    return {
      single: { type: null, provider: null, notes: null }
    }
  }
}
</script>
