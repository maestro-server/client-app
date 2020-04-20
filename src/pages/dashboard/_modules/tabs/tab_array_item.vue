<template>
  <creater-list
    :single.sync="item"
    :basket.sync="items"
    :show-add-btn="false"
    :label="label"
    @update="updaterEdit"
  >
    <template slot="forms">
      <form>
        <bs-input
          v-model="item"
          v-validate.initial="'required'"
          :type="inputType"
          form-type="horizontal"
          name="item"
          :label="inputLabel"
        />


        <div class="text-center">
          <button
            class="btn btn-primary btn-sm"
            @click.prevent.stop="addItemTo"
          ><i class="fa fa-plus-circle"/> {{ label }}</button>
        </div>
      </form>
    </template>


    <template
      slot="view"
      slot-scope="props"
    >
      {{ props.item }}
    </template>
  </creater-list>
</template>


<script>
'use strict'

import _ from 'lodash'

export default {
  props: {
    label: {},
    inputLabel: {
      type: String,
      default: 'Name'
    },
    inputType: {
      type: String,
      default: 'text'
    },
    defaultValue: { default: () => [] }
  },

  data: function () {
    return {
      item: null,
      items: _.clone(this.defaultValue)
    }
  },

  methods: {
    updaterEdit (data) {
      this.$set(this, 'items', data || [])
      this.$emit('update', this.items)
    },

    reset () {
      this.items = []
    },

    addItemTo () {
      this.items.push(this.item)
      this.item = null
      this.updaterEdit(this.items)
    }
  }

}
</script>
