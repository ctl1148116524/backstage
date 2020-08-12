/*
 * @Author: your name
 * @Date: 2020-07-16 19:39:06
 * @LastEditTime: 2020-08-12 09:58:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \app\src\router\index.js
 */

import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";
Vue.use(VueRouter);
import Layout from "@/layout"; //使用公共组件的页面
import { injectionmenu } from "@/router/getmenu"; //动态添加的路由 注意 动态路由一定要从allmenu中获取 ,不能从store中获取,路由存入store后会少一些东西,导致加载出错
import { app } from "@/api/login";
import { loginout } from "@/utils";

const originalPush = VueRouter.prototype.push; //解决element 重复点击报错
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

// var home = () =>
//   import(/* webpackChunkName:"view-home"*/ "../views/home/index.vue");
function loadView(view) {
  return () =>
    import(/* webpackChunkName:"[request]"*/ "@/views/" + view + "/index.vue");
}

var routes = [
  //通用菜单
  {
    path: "/",
    name: "login",
    component: loadView("login"),
    meta: {
      title: "登录",
    },
  },
];
// {path:'/menu3',component:loadView1('page'),children:[
//     {path:'page1', component:loadView1('page1')},
//     {path:'page2', component:loadView1('page2')},
//     {path:'page3', component:loadView1('page3')}
// ]}
var createRouter = () =>
  new VueRouter({
    // mode: 'history',
    routes, // (缩写) 相当于 routes: routes
  });
var router = createRouter();
export function resetRouter() {
  //解决addroutes重复添加问题
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // the relevant part
}

router.beforeEach((to, from, next) => {
  let onlogins = store.state.onlogin;
  let menus = store.state.menu;
  // console.log(to);
  // console.log(from);
  // console.log(onlogins);
  // console.log(menus);
  if (onlogins) {
    next();
  } else {
    if (to.path === "/") {
      //这就是跳出循环的关键
      //状态是退出 且要跳到登录页面
      next();
    } else {
      //状态是退出 在操作页面里刷新 不是跳到登录页面
      alert("登录失效");
      next("/"); //强制跳到登录
    }
  }
});
router.onReady((val) => {
  let onloginonce = store.state.onlogin;
  let menuonce = store.state.menu;
  //console.log(onloginonce)
  //console.log(menuonce)
  if (val.name != "login" && onloginonce && menuonce) {
    //console.log(val)
    //确认登录
    app()
      .then((res) => {
        let no = res.data.status; //返回的状态码
        //console.log(no);
        if (no != "200") {
          alert("登录失效");
          loginout();
        } else {
          injectionmenu(menuonce); //添加路由

          //console.log(menuonce);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    //injectionmenu("all", router); //测试用
  }
});
router.afterEach((to, from) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
});
export default router;
