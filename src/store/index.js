/*
 * @Author: your name
 * @Date: 2020-07-16 19:41:31
 * @LastEditTime: 2020-07-23 13:53:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \app\src\store\index.js
 */

import Vue from "vue";
import Vuex from "vuex";
import createVuexAlong from "vuex-along";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    onlogin: false, //登录状态
    user_name: "", //登录名称
    token: "", //token
    menu: [], //动态路由 权限
    list: [], //路由列表
  },
  mutations: {
    login(state, payload) {
      state.onlogin = payload.amount[0];
      state.user_name = payload.amount[1];
      state.token = payload.amount[2];
    },
    readdmenu(state, payload) {
      state.menu = payload.amount[0];
      state.list = payload.amount[1];
    },
   
  },
  actions: {},
  modules: {},
  plugins: [
    createVuexAlong({
      // 设置保存的集合名字，避免同站点下的多项目数据冲突
      name: "app-vuex-along",
    }),
  ],
});
