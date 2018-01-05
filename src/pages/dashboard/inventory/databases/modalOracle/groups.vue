<template>
  <modal title="ASM Groups" effect="fade" v-model="showModal" @closed="showModal = false" sub-modal small>

    <creater-list :single.sync="single" :basket.sync="value" label="ASM Group" @update="updaterEdit">

      <template slot="forms">
        <form>
          <bs-input class="mt10" name="name" label="ASM Group Name*" v-model="single.name"></bs-input>

          <bs-input type="number" class="mt10" name="size" label="GB Size*" v-model="single.size"></bs-input>
        </form>
      </template>

      <template slot="view" slot-scope="props">
        {{props.item.name}} <bs-label>{{props.item.size}}</bs-label>
      </template>

    </creater-list>


    <div slot="modal-footer" class="modal-footer">
      <button type="button" class="btn btn-danger" @click="clearItems">Clear Groups</button>
      <button type="button" class="btn btn-primary" @click="showModal = false">Add Groups</button>
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
