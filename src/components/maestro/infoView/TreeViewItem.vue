<template>
  <span>
    <template v-if="isArray(items)">
      <ul class="pl0">
        <li v-for="item, k in items" :key="k">
          <tree-view :items="item"/>
        </li>
      </ul>
    </template>

    <template v-if="isObject(items)">
      <div v-for="item, key in items" :key="key">
        <strong>{{ key }}:</strong>
        <span :class="{'tree-view-item-leaf': !isValue(item)}">
          <tree-view :items="item"/>
        </span>
      </div>
    </template>

    <template v-if="isValue(items)">
      <span class="stringColor"> {{ items }}</span>
    </template>

    <template v-if="isBoolean(items)">
      <span class="booleanColor"> {{ items }}</span>
    </template>

    <template v-if="isNumber(items)">
      <span class="numberColor"> {{ items }}</span>
    </template>
  </span>
</template>


<script>
import _ from "lodash";

export default {
  name: "TreeView",
  props: {
    items: {}
  },

  methods: {
    isObject: function(value) {
      return _.isPlainObject(value);
    },

    isArray: function(value) {
      return _.isArray(value);
    },

    isValue: function(value) {
      return _.isString(value);
    },

    isNumber: function(value) {
      return _.isNumber(value);
    },

    isBoolean: function(value) {
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

.emptyColor {
  color: #ff00;
  text-decoration: underline;
}
</style>
