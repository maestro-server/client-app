import Centrifuge from 'centrifuge';
import Login from 'services/login'
import { EventBus } from 'src/resources/bus/bus-general.js'
import websocket_url from 'src/resources/libs/websocket_url'
import tenantMananger from 'services/tenantManager'


class WSocket {

  constructor () {
    this.centr = new Centrifuge(websocket_url + '/connection/websocket');
  }

  connect () {
    const token = Login.getToken();
    const id = _.get(tenantMananger.get(), '_id');
    const channel = `maestro-${id}`;

    this.centr.setToken(token);
    this.subChannel(channel, (result) => {
      this.notify(result);
      this.events(result);
    });
    this.centr.connect();
  }

  subChannel (channel, callback) {
    this.centr.subscribe(channel, callback)
      .on("error", console.log);
  }

  notify (result) {
    const notify = _.get(result, 'data.notify');
    if (notify) {
      EventBus.$emit('call-notify', notify);
    }
  }

  events (result) {
    const event = _.get(result, 'data.event');
    if (event) {
      const callers = _.get(event, 'caller');
      this.iterEvents(callers);
    }
  }

  iterEvents (callers) {
    if (callers.constructor === Array) {
      _.forEach(callers, this.disparEvent)
    }

    if (callers.constructor === String) {
      this.disparEvent(callers)
    }
  }

  disparEvent (caller) {
    EventBus.$emit(caller, event)
  }
}

export const WSBus = new WSocket();
