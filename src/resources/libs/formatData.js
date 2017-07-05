'use strict'

const format = (data) => {
  const result = new Date(data).toLocaleString('en-US').split(', ')
  return result[0] + " - " +  result[1]
}

export default format
