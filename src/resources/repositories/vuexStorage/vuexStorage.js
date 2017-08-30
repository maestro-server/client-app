'use strict'

import _ from 'lodash'
import vuexStore from 'src/store'


function vuexData() {
  return vuexStore.state.cache
}

function read(key) {
  const cache = vuexData()

  if(cache.hasOwnProperty(key)) {
    return cache[key]
  }
}

function write(key, data) {
  if(_.isString(key) && !_.isEmpty(data)) {
    const prep = {[key]: data}
    return vuexStore.dispatch('callCache', prep)
  }
}

function each(fn) {
  const lists = vuexData()

  for (let key in lists) {
    fn(lists[key], key)
  }
}

function remove(key) {
  const content = vuexData()
  const newValue = _.omit(content, key)
  return vuexStore.dispatch('callCache', newValue)
}

function clearAll() {
  return vuexStore.dispatch('callCache', {})
}

export default {
  name: 'vuexStorage',
  read,
  write,
  each,
  remove,
  clearAll,
};
