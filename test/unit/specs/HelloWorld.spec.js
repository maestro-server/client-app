
import App from 'src/App'

describe('App.vue', () => {
  it('Created function', () => {
    const ty = typeof App['created']
    expect(ty).to.equal('function')
  })
})
