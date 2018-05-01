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
          <span :class="{'tree-view-item-leaf': !isValue(item)}">
            <tree-view :items="item"></tree-view>
          </span>
        </div>
      </template>
    </template>

    <template v-if="isValue(items)">
      <span class="stringColor">{{ items }}</span>
    </template>

    <template v-if="isBoolean(items)">
      <span class="booleanColor">{{ items }}</span>
    </template>

    <template v-if="isNumber(items)">
      <span class="numberColor">{{ items }}</span>
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

      isValue: function (value) {
        return _.isString(value);
      },

      isNumber: function (value) {
        return _.isInteger(value);
      },

      isBoolean: function (value) {
        return _.isBoolean(value);
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

  .stringColor {
    color: #06867e;
  }

  .booleanColor {
    color: #e84f48;
  }

  .numberColor {
    color: #2c2e86;
  }
</style>
