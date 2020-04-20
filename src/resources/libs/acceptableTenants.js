'use strict'

const accept = (refs, acceptable = ['teams']) => {
  return acceptable.filter(e => e === refs).length
}

export default accept
