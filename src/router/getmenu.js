/*
 * @Author: your name
 * @Date: 2020-07-21 15:58:35
 * @LastEditTime: 2020-08-12 10:29:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \app\src\router\getmenu.js
 */
import store from "@/store";
import router from "@/router";
import menu from "@/router/allmenu";
var ordinary = ["home", "about", "user", "p404"]; //普通权限
var supers = ["home", "company", "department", "assets", "p404"]; //超级权限

export function injectionmenu(authority) {
  //store中保存的权限 ,router实例
  //   //登录用 进入后刷新用
  //   //根据权限匹配路由
  switch (authority) {
    case "ordinary": //普通
      match(authority, ordinary, router);
      break;
    case "super": //超级
      match(authority, supers, router);
      break;

    default:
      match(authority, ordinary, router);
      break;
  }
}
function match(authority, val, router) {
  let addmenu = [];
  let length = val.length;
  for (let i = 0; i < length; i++) {
    let name = menu[val[i]];
    addmenu.push(name);
  }
  //console.log(addmenu);
  //console.log(addmenu[4]);

  router.addRoutes(addmenu); //动态添加
  store.commit({
    type: "readdmenu",
    amount: [authority, addmenu],
  });
}

// export function injectionmenu(authority, router) {
//   //store中保存的权限 ,router实例
//   //登录用 进入后刷新用
//   //根据权限匹配路由
//   let addmenu = [];
//   if (authority != "all") {
//     if (!Array.isArray(authority)) {
//       //判断是否数组
//       authority = authority.split(","); //字符串转数组
//       authority = authority.filter((item) => item); //数组去空
//     }
//     let length = authority.length;
//     for (let i = 0; i < length; i++) {
//       let name = menu[authority[i]];
//       addmenu.push(name);
//     }
//     addmenu.push(menu[404]); //每个权限都加404 页面
//     //console.log(authority);
//   } else {
//     authority = ["home", "user", "about", "function", "404"];
//     let length = authority.length;
//     for (let i = 0; i < length; i++) {
//       let name = menu[authority[i]];
//       addmenu.push(name);
//     }
//   }
//   router.addRoutes(addmenu); //动态添加
//   //if (!store.state.menu) {
//   store.commit({
//     type: "readdmenu",
//     amount: [authority, addmenu],
//   });
//   //}
// }
