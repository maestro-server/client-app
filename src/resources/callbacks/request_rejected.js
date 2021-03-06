/* eslint-disable prefer-const */
'use strict'

import _ from 'lodash'
import { EventBus } from 'src/resources/bus/bus-general.js'

const mapper = {
  422: {
    title: (e) => `Field, ${_.get(e, 'err.errors[0].message')}`,
    msg: (e) => `Complete path is ${_.toUpper(_.get(e, 'err.errors[0].path'))}`
  },
  400: {
    title: (e) => `${_.get(e, 'err.errors')}`,
    msg: () => "We have problems to process this request"
  },
  401: {
    title: (e) => `${_.get(e, 'err.errors[0].message')}`,
    msg: () => "You not authorize to do this!"
  },
  403: {
    title: (e) => `${_.get(e, 'err.errors[0].message')}`,
    msg: () => "You not authorize to do this!"
  },
  404: {
    title: () => "The resource not exist.",
    msg: () => ""
  },
  409: {
    title: (e) => `${_.get(e, 'err.errors[0].failed')}`,
    msg: () => "This data is duplicate (Conflict)"
  },
  501: {
    title: () => "Missing configuration or connection problems",
    msg: (e) => `${_.get(e, 'err.name')} ${_.get(e, 'err.errors')}`
  },
  500: {
    title: () => "Error occur",
    msg: () => ""
  }
}

export default (e) => {
  const response = _.get(e, 'response', null)

  // eslint-disable-next-line prefer-const
  let data = {
    show: true,
    msg: "Houston, we have a problem ...",
    title: "I can't connect to Maestro Server",
    type: "danger"
  }

  if (response) {
    _.set(data, "msg", "Houston, we have a problem ...")
    _.set(data, "title", "Sorry, but occur a problem, contact us")

    const hash = window.location.hash

    if ([401, 403].includes(response.status) && hash !== "#/login") {
      window.location.hash = "/auth/logout"
      return
    }

    // eslint-disable-next-line eqeqeq
    if (response.status == 403) {
      window.location.hash = "/auth/logout"
      return
    }

    const ch = {
      show: true,
      msg: mapper[response.status].msg(_.get(response, 'data')),
      title: mapper[response.status].title(_.get(response, 'data')),
      type: "danger"
    }

    Object.assign(data, ch)
  }

  EventBus.$emit('call-notify', data)
}
