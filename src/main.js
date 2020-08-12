/*
 * @Author: your name
 * @Date: 2020-07-16 19:34:27
 * @LastEditTime: 2020-08-07 16:43:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \app\src\main.js
 */

import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import svgicon from "@/components/svgicon/index.vue"; // svg组件
Vue.component("svg-icon", svgicon);
import "@/icons/index.js";
import "@/components/font/iconfont.css";

Vue.config.productionTip = false;
var app = new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
