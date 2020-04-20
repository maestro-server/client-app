<template>
  <creater-list
    :single.sync="single"
    :basket="value"
    label="Contact"
    @update="updaterEdit"
  >
    <template slot="forms">
      <typeahead
        v-model="single.channel"
        v-validate.initial="'required'"
        label="Channel"
        name="channel"
        placeholder="Email, Hipchat"
        :data="types"
        form-type="horizontal"
        :headers="headers"
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
      <bs-label>{{ props.item.channel }}</bs-label>
      - {{ props.item.value }}
    </template>
  </creater-list>
</template>


<script>
'use strict'
import TabCreaterList from 'mixins/tab-creater-list'
import headerLogin from 'src/resources/libs/headerAuthorization'

export default {
  mixins: [TabCreaterList],

  props: {
    types: {}
  },

  data: function () {
    return {
      headers: headerLogin,
      single: { channel: null, value: null }
    }
  }
}

</script>
