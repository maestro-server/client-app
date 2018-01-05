<template>
  <creater-list :single.sync="item" :basket.sync="items" :show-add-btn="false" :label="label" @update="updaterEdit">

    <template slot="forms">
      <form>
        <bs-input form-type="horizontal" v-model="item" name="item" label="Name"
                  v-validate.initial="'required'"></bs-input>


        <div class="text-center">
          <a href="#" @click.prevent.stop="addItemTo" class="btn btn-primary btn-sm"><i
            class="fa fa-plus-circle"></i> {{label}}</a>
        </div>
      </form>
    </template>


    <template slot="view" slot-scope="props">
      {{props.item}}
    </template>

  </creater-list>

</template>


<script>
  'use strict'

  import _ from 'lodash'

  export default {
    props: {
      label: {},
      defaultValue: {default: () => []}
    },

    data: function () {
      return {
        item: null,
        items: _.clone(this.defaultValue)
      }
    },

    methods: {
      updaterEdit(data) {
        this.$set(this, 'items', data || [])
        this.$emit('update', this.items)
      },

      reset() {
        this.items = []
      },

      addItemTo() {
        this.items.push(this.item)
        this.item = null
        this.updaterEdit(this.items)
      }
    }

  }
</script>
