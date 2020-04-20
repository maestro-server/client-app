import { expect } from 'chai'
import App from 'src/App'

describe('App.vue', () => {
  it('Created object', () => {
    const ty = typeof App.created
    expect(ty).to.equal('function')
  })
})
