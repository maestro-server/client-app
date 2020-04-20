'use strict';

import session from './sessionStorage'
import local from './localStorage'
import vuex from './vuexStorage'

const avaliable = { session, local, vuex }

const Storage = ({ k, time, persistence }) => {

  const Repository = avaliable[persistence || 'session']

  return {
    create (result) {
      return new Repository(k, time)
        .createStore(result);
    },

    get () {
      return new Repository(k)
        .restoreStore();
    },

    delete () {
      return new Repository(k)
        .deleteStore();
    },

    clear () {
      return new Repository()
        .clearStore();
    },

    each (fn) {
      return new Repository()
        .eachStore(fn)
    }

  };
};

export default Storage;
