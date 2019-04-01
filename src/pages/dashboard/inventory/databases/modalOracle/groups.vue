<template>
  <modal
v-model="showModal"
title="ASM Groups"
effect="fade"
sub-modal
small
@closed="showModal = false"
>
<creater-list
:single.sync="single"
:basket.sync="value"
label="ASM Group"
@update="updaterEdit"
>
<template slot="forms">
        <form>
          <bs-input
v-model="single.name"
class="mt10"
name="name"
label="ASM Group Name*"
/>

          <bs-input
v-model="single.size"
type="number"
class="mt10"
name="size"
label="GB Size*"
/>
        </form>
      </template>

      <template
slot="view"
slot-scope="props"
>
        {{ props.item.name }} <bs-label>{{ props.item.size }}</bs-label>
      </template>
</creater-list>


    <div
slot="modal-footer"
class="modal-footer"
>
      <button
type="button"
class="btn btn-danger"
@click="clearItems"
>
Clear Groups
</button>
      <button
type="button"
class="btn btn-primary"
@click="showModal = false"
>
Add Groups
</button>
    </div>
  </modal>
</template>

<script>
  'use strict'

  import Modals from 'mixins/modals'
  import TabCreaterList from 'mixins/tab-creater-list'

  export default {
    mixins: [Modals, TabCreaterList],

    data () {
      return {
        showModal: false,
        single: {name: null}
      }
    },

    methods: {
      clearItems() {
        this.value = []
      }
    }
  }
</script>
