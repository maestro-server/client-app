<template>

  <creater-list :single.sync="single" :basket="value" label="Storage" @update="updaterEdit">
    <template slot="forms">
      <bs-input form-type="horizontal" label="Name" v-model="single.name" name="name"
                v-validate.initial="'required'"
                placeholder="/dev/sda"></bs-input>
      <bs-input form-type="horizontal" label="Size (GB)" v-model="single.size" name="size" placeholder="500"
                v-validate.initial="'required|numeric'"
                :error="makeError('size')"></bs-input>

      <div class="row" id="baseStorage">
        <div class="col-xs-3 text-right mt5">
          <label>Root device</label>
        </div>
        <div class="col-xs-9">
         <button-group v-model="single.root" type="default">
           <bs-radio selected-value="root">Yes</bs-radio>
           <bs-radio selected-value="secondary">No</bs-radio>
         </button-group>
       </div>
     </div>
   </template>

   <template slot="view" scope="props">
        {{props.item.name}} -
       <bs-label>{{props.item.size}} GB</bs-label>
       <bs-label type="danger" v-if="props.item.root == 'root'">root</bs-label>
   </template>

 </creater-list>
</template>


<script>
 'use strict'

 export default {

   data: function () {
     return {
       value: [],
       single: {name: null, size: null, root: null}
     }
   },

   methods: {
     updaterEdit(data) {
       this.$set(this, 'value', data || [])
       this.$emit('update', this.value)
       this.errors.clear()
     },

     reset() {
       this.value = []
     }
   }

 }

</script>
