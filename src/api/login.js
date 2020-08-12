/*
 * @Author: your name
 * @Date: 2020-07-17 10:20:43
 * @LastEditTime: 2020-07-22 15:30:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \app\src\api\user.js
 */

import request from "@/utils/request";
import store from "@/store";

export function login(data) {
  //登录
  return request({
    //baseURL: "http://localhost:81",
    url: "/post/login",
    method: "post",
    data: data,
  });
}
export function app(data) {
  //验证登录状态
  return request({
    //baseURL: "http://localhost:81",
    url: "/post/app",
    method: "post",
    data: data,
    headers: { token: store.state.token },
  });
}
// export function post(data) {
//   //
//   return request({
//     url: "https://api3.smechina.com.cn/api/services/app/imageInfo/GetXHPriceMax",
//     method: "post",
//     data: data,
//   });
// }

// export function getInfo(token) {
//   return request({
//     url: "/vue-admin-template/user/info",
//     method: "get",
//     params: { token },
//   });
// }
