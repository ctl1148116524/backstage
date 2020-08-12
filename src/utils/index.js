/*
 * @Author: your name
 * @Date: 2020-07-22 14:01:12
 * @LastEditTime: 2020-07-23 14:20:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \app\src\utils\index.js
 */

import store from "@/store/index";
import router from "@/router/index";
export function loginout() {
  window.clearVuexAlong(); //清理 localStorage 和 sessionStorage
  store.commit({
    //vuex退出登录状态
    type: "login",
    amount: [false, null, null],
  });
  store.commit({
    //vuex退出登录 动态菜单清空
    type: "readdmenu",
    amount: [null, null],
  });
  router.replace("/");
}
