'use strict'

const format = (result) => {
  const clear = [];

  if (result.data) {
    const data = result.data

    if (data.items && Array.isArray(data.items)) {
      const first = _.head(data.items);
      return _.get(first, 'value');
    }
  }

  return clear;
}

export default format
