<template>
  <creater-list
:single.sync="single"
:basket="value"
:label="label"
:fielder="fielder"
@update="updaterEdit"
>
<template slot="forms">
      <bs-input
v-model="single[fielder]"
v-validate.initial="'required'"
form-type="horizontal"
:name="fielder"
                label="Name"
/>
    </template>

    <template
slot="view"
slot-scope="props"
>
      <slot
name="list"
:item="props"
>
        {{ props.item[fielder] }}
      </slot>
    </template>
</creater-list>
</template>


<script>
'use strict'

import TabCreaterList from 'mixins/tab-creater-list'

export default {
  mixins: [TabCreaterList],

  props: {
    label: {},
    fielder: { default: 'name', type: String }
  },

  data: function () {
    return {
      single: { [this.fielder]: null }
    }
  }

}
</script>
