<template>
  <span>
    <template v-if="isArray(items)">
      <ul class="pl0">
        <li v-for="item in items">
          <tree-view :items="item"></tree-view>
        </li>
      </ul>
    </template>

    <template v-if="isObject(items)">
      <template v-for="item, ok in items">
        <div>
          <strong>{{ok}}: </strong>
          <span :class="{'tree-view-item-leaf': !isString(item)}">
            <tree-view :items="item"></tree-view>
          </span>
        </div>
      </template>
    </template>

    <template v-if="isString(items)">
      {{ items }}
    </template>
  </span>
</template>


<script>

  import _ from 'lodash'

  export default {
    name: "tree-view",
    props: {
      items: {}
    },

    methods: {
      isObject: function (value) {
        return _.isPlainObject(value);
      },

      isArray: function (value) {
        return _.isArray(value);
      },

      isString: function (value) {
        return _.isString(value);
      }
    }
  };
</script>

<style>
  .tree-view-item-leaf {
    display: block;
    white-space: normal;
    padding-left: 15px;
  }
</style>
