[![Code Climate](https://codeclimate.com/github/maestro-server/client-app/badges/gpa.svg)](https://codeclimate.com/github/maestro-server/client-app) [![Build Status](https://travis-ci.org/maestro-server/client-app.svg?branch=master)](https://travis-ci.org/maestro-server/client-app) [![Issue Count](https://codeclimate.com/github/maestro-server/client-app/badges/issue_count.svg)](https://codeclimate.com/github/maestro-server/client-app)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/12101716a7a64a07a38c8dd0ea645606)](https://www.codacy.com/app/maestro/client-app?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=maestro-server/client-app&amp;utm_campaign=Badge_Grade)

# Maestro Server #

Maestro Server is an open source software platform for management and discovery servers, apps and system for Hybrid IT. Can manage small and large environments, be able to visualize the latest multi-cloud environment state.

### Demo ###
To test out the demo, [Demo Online](http://demo.maestroserver.io "Demo Online")


# Maestro Server - Client APP #

SPA application, comunicate only with Server API and Websocket API

## Tools

| Name                 | Description                                                                                                                           |
|----------------------|---------------------------------------------------------------------------------------------------------------------------------------|
| Vue2                 | Main framework, using by react and manager views, routes and temaplates, use vue-loader with webpack                                  |
| Webpack2             | bundler generate                                                                                                                      |
| Bootue               | All micro components, like buttons, tables, forms and etc, its 100% Bootstrap3 components built with Vue2, 100% standalone, no query. |
| Nginx                | Using for proxy reverse                                                                                                               |
| Mocha / Chai / Sinon | Test, asserts and mock library.

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).                                                          |

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

## Vue2 Macro Architecture

![arch](http://docs.maestroserver.io/en/latest/_images/client_arch.png)

#### Important topics

Front end application is divided in:

 * **src/pages:** templates and bussiness rules (domain layer)
 * **resources:** factories, modals, and cache managers (infrastructure layer)

A single folder structure components normally use:

![arch](http://docs.maestroserver.io/en/latest/_images/client_component.png)

### Env variables ###

| Env Variables | Example                  | Description                     |
|---------------|--------------------------|---------------------------------|
| API_URL       | http://localhost:8888    | Server App Url                  |
| ANALYTICS_URL | http://localhost:9999    | Analytics App Url               |
| STATIC_URL    | /upload/                 | Relative path of static content |
| LOGO          | /static/imgs/logo300.png | Image Logotype, (login page)    |
| THEME         | lotus                    | Themes (gold, wine, blue, green)|


### Contribute ###

Are you interested in developing Maestro Server, creating new features or extending them?

We created a set of documentation, explaining how to set up your development environment, coding styles, standards, learn about the architecture and more. Welcome to the team and contribute with us.

[See our developer guide](http://docs.maestroserver.io/en/latest/contrib.html)
