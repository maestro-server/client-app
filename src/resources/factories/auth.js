
import Factory from './factory'
import LocalStorageRepository from '../repositories/localStorage'

class Auth extends Factory {

  constructor(e='/users/auth') {
    super(e)
  }

  auth (data, callback) {
    return this.create(data, (e) => {
      this.success(e)
      callback(e)
    })
  }

  success (result) {
    new LocalStorageRepository()
      .createStore(result.data.token)
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
