
import Centrifuge from 'centrifuge';
import Login from 'services/login'
import {EventBus} from 'src/resources/bus/bus-general.js'
import websocket_url from 'src/resources/libs/websocket_url'


class WSocket {

  constructor() {
    this.centr = new Centrifuge(websocket_url + '/connection/websocket');
  }

  connect() {
    const token = Login.getToken();
    const id = Login.getID();
    const channel = `maestro#${id}`;

    this.centr.setToken(token);
    this.subChannel(channel, (result) => {
      this.notify(result);
      this.events(result);
    });
    this.centr.connect();
  }

  subChannel(channel, callback) {
    this.centr.subscribe(channel, callback)
    .on("error", console.log);
  }

  notify(result) {
    const notify = _.get(result, 'data.notify');
    if(notify) {
      EventBus.$emit('call-notify', notify);
    }
  }

  events(result) {
    const event = _.get(result, 'data.event');
    if(event) {
      EventBus.$emit(_.get(event, 'caller'), event);
    }
  }
}

export const WSBus = new WSocket();
