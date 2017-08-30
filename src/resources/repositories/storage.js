'use strict';

const Storage = ({k, time, persistence}) => {

  const repositoryP = persistence || 'session'
  const Repository = require(`./${repositoryP}Storage`).default

  return {
    create(result) {
      return new Repository(k)
        .createStore(result, time);
    },

    get() {
      return new Repository(k, time)
        .restoreStore();
    },

    delete() {
      return new Repository(k)
        .deleteStore();
    }
  };
};

export default Storage;
