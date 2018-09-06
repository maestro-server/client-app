'use strict'
import comp from './dependencies'
import choose from "./choose/router";
import single from "./single/router";

export default {
  path: 'dependency-maker',
  component: comp,
  children: [
    choose,
    single
  ]
}
