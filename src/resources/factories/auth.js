
import Factory from './factory'

class Auth extends Factory {

  constructor() {
    super()

    this.entity = '/users/auth'
    this.ACCESS = 'x-access'

    this.callback;

    return this
  }

  auth (data, success) {

    this.callback = success

    return this.create(data, (e) => {
      this.success(this, e)
    })
  }

  success (that, result) {

    const token = result.data.token



    this.createStore(token)

    //this.callback()
  }

  createStore () {
    console.log(this)
    localStorage.setItem('x-access', "ok")
  }

  restoreStore () {
    return localStorage.getItem(this.ACCESS)
  }

}

export default Auth

/*
 get  : function(key) {
 var entry = JSON.parse(localStorage.getItem(key)||"0");
 if (!entry) return null;
 if (entry.ttl && entry.ttl + entry.now < now()) {
 localStorage.removeItem(key);
 return null;
 }
 return entry.value;
 },
 set : function( key, value, ttl ) {
 localStorage.setItem( key, JSON.stringify({
 ttl   : ttl || 0,
 now   : now(),
 value : value
 }) );
 }
 */
