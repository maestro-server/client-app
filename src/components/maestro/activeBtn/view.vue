<template>
  <div
v-if="!act"
class="col-xs-12"
>
    <div class="btn btn-danger text-center col-xs-12">
Disabled
</div>
  </div>
</template>


<script>
'use strict'

export default {
  props: {
    act: { type: Boolean, default: true }
  }
}

</script>
