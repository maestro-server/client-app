
import App from '@/App'

describe('App.vue', () => {
  it('has a created hook', () => {
    expect(typeof App.created).toBe('function')
  })
})
