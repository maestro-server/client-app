<template>
  <div class="col-xs-12" v-if="!act">
    <div class="btn btn-danger text-center col-xs-12">Disabled</div>
  </div>
</template>


<script>
  'use strict'

  export default {
    props: {
      act: {type: Boolean, default: true}
    }
  }

</script>
