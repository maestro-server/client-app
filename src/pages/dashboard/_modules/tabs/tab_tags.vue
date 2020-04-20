<template>
  <creater-list
:single.sync="single"
:basket="value"
:label="label"
fielder="key"
@update="updaterEdit"
>
<template slot="forms">
      <bs-input
v-model="single.key"
v-validate.initial="'required'"
form-type="horizontal"
name="key"
                label="Key"
/>
      <bs-input
v-model="single.value"
v-validate.initial="'required'"
form-type="horizontal"
name="value"
                label="Value"
/>
    </template>

    <template
slot="view"
slot-scope="props"
>
      <bs-label>{{ props.item.key }}</bs-label> - {{ props.item.value }}
    </template>
</creater-list>
</template>


<script>
'use strict'

import TabCreaterList from 'mixins/tab-creater-list'

export default {
  mixins: [TabCreaterList],

  props: {
    label: { default: "Tag" }
  },

  data: function () {
    return {
      single: { key: null, value: null }
    }
  }

}

</script>
