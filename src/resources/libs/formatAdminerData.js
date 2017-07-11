'use strict'

const format = (result, fn) => {
  let clear = [];

  if(result.data) {
    const data = result.data

    if(data.items && Array.isArray(data.items)) {
      const {items} = data
      fn(items[0])
    }


  }

  return clear;
}

export default format
