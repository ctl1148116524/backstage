/*
 * @Author: your name
 * @Date: 2020-07-20 13:38:41
 * @LastEditTime: 2020-08-12 10:28:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \app\src\router\allmenu.js
 */
import Layout from "@/layout"; //使用公共组件的页面
//import router from "@/router";

function loadView(view) {
  return () =>
    import(/* webpackChunkName:"[request]"*/ "@/views/" + view + "/index.vue");
}
var menu = {
  home: {
    path: "/home", //路径
    redirect: "/home/index", //重定向
    component: Layout, //进入公共组件
    meta: { title: "主页", icon: "el-icon-s-home" }, //网页标题
    children: [
      //子路由
      {
        path: "index",
        name: "home", //路由名称
        component: loadView("home"), //子路由的渲染会在layout里的router-view里
        meta: { title: "主页" }, //单个页面title跟父级一样 ,多个不用
      },
    ],
  },
  company: {
    path: "/company", //路径
    redirect: "/company/index", //重定向
    component: Layout, //进入公共组件
    meta: { title: "企业", icon: "iconfont icon-qiye" }, //网页标题
    children: [
      //子路由
      {
        path: "index",
        name: "company", //路由名称
        component: loadView("company"), //子路由的渲染会在layout里的router-view里
        meta: { title: "企业" }, //单个页面title跟父级一样 ,多个不用
      },
    ],
  },
  department: {
    path: "/department", //路径
    redirect: "/department/index", //重定向
    component: Layout, //进入公共组件
    meta: { title: "部门", icon: "iconfont icon-drxx45" }, //网页标题
    children: [
      //子路由
      {
        path: "index",
        name: "department", //路由名称
        component: loadView("department"), //子路由的渲染会在layout里的router-view里
        meta: { title: "部门" }, //单个页面title跟父级一样 ,多个不用
      },
    ],
  },
  assets: {
    path: "/assets", //路径
    redirect: "/assets/index", //重定向
    component: Layout, //进入公共组件
    meta: { title: "资产", icon: "iconfont icon-zichan-copy-copy" }, //网页标题
    children: [
      //子路由
      {
        path: "index",
        name: "assets", //路由名称
        component: loadView("assets"), //子路由的渲染会在layout里的router-view里
        meta: { title: "资产" }, //单个页面title跟父级一样 ,多个不用
      },
    ],
  },
  // about: {
  //   //关于我们
  //   path: "/about",
  //   redirect: "/about/index",
  //   component: Layout,
  //   meta: { title: "about", icon: "el-icon-menu" },
  //   children: [
  //     {
  //       path: "index",
  //       name: "aboutpage",
  //       component: loadView("about"),
  //       meta: { title: "about1" }, //
  //     },
  //     {
  //       path: "page",
  //       name: "aboutpage2",
  //       component: loadView("about2"),
  //       meta: { title: "about2" }, //
  //     },
  //   ],
  // },
  // user: {
  //   //用户
  //   path: "/user",
  //   redirect: "/user/index",
  //   component: Layout,
  //   meta: { title: "user", icon: "el-icon-menu" },
  //   children: [
  //     {
  //       path: "index",
  //       name: "userpage",
  //       component: loadView("user"),
  //       meta: { title: "user1" }, //
  //     },
  //     {
  //       path: "page",
  //       name: "userpage2",
  //       component: loadView("user2"),
  //       meta: { title: "user2" }, //
  //     },
  //   ],
  // },
  // function: {
  //   //功能
  //   path: "/function",
  //   redirect: "/function/index",
  //   component: Layout,
  //   meta: { title: "功能模块", icon: "el-icon-menu" },
  //   children: [
  //     {
  //       path: "index",
  //       name: "functionpage",
  //       component: loadView("function/img"),
  //       meta: { title: "上传图片功能" }, //
  //     },
  //     {
  //       path: "page",
  //       name: "functionpage2",
  //       component: loadView("function/img"),
  //       meta: { title: "功能2" }, //
  //     },
  //   ],
  // },
  p404: {
    //必须放到最后一个
    path: "*",
    name: "404",
    component: loadView("404"),
    meta: {
      title: "404",
    },
  },
};
export default menu;
