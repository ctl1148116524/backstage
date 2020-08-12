/*
 * @Author: your name
 * @Date: 2020-07-16 22:38:42
 * @LastEditTime: 2020-08-07 16:34:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \app\src\icons\index.js
 */

import Vue from "vue";
import svgicon from "@/components/svgicon/index.vue"; // svg component

// register globally  <svg-icon icon-class="password" />
Vue.component("svg-icon", svgicon);

const req = require.context("./svg", false, /\.svg$/);
const requireAll = (requireContext) =>
  requireContext.keys().map(requireContext);
requireAll(req);
