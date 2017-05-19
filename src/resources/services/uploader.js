'use strict';

import store from 'store'
import Login from 'services/login'

class Uploader {

  constructor(ref=null) {
    this.ref=ref
  }

  getSignedRequest(file){
      const xhr = new window.XMLHttpRequest();

      xhr.open('GET', `${API_URL}/${this.ref}/upload?filename=${file.name}&filetype=${file.type}`);
      xhr.setRequestHeader('Accept', 'application/json')
      xhr.setRequestHeader("Authorization", Login.Authorization())
      xhr.onreadystatechange = () => {
          if(xhr.readyState === 4){
              if(xhr.status === 200){
                  const response = JSON.parse(xhr.responseText);
                  this.uploadFile(file, response.signedRequest, response.url);
              }
              else{
                 let response;

                 try {
                   response = JSON.parse(xhr.responseText);
                 } catch(e) {
                   response = {message: "Uploader error"}
                 }

                 Uploader.uploadError(response.message)
              }
          }
      };
      xhr.send();
  }

  uploadFile(file, signedRequest, url){
      const xhr = new XMLHttpRequest();
      xhr.open('PUT', signedRequest);
      xhr.onreadystatechange = () => {
          if(xhr.readyState === 4){
              if(xhr.status === 200){
                console.log(url)
                  // document.getElementById('profileAvatar').src = url;
                  // this.scope.model.avatar = url + '?' + new Date().getTime();
                  // this.scope.model.labelFile = file.name;
              }
              else{
                Uploader.uploadError('Could not upload file.')
              }
          }
      };
      xhr.send(file);
  }

  static uploadError (title) {
    const data = {
      show: true,
      title,
      msg: "Sorry, maybe your image sank in the ocean, try again",
      type: "danger"
    }

    store.dispatch('callAlert', {...data})
  }

}

export default Uploader;
