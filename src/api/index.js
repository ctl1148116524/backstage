/*
 * @Author: your name
 * @Date: 2020-07-20 14:00:57
 * @LastEditTime: 2020-08-11 20:12:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \app\src\api\index.js
 */

import request from "@/utils/request";
import store from "@/store";

export function get_company(data) {
  //验证登录状态
  return request({
    baseURL: "http://api5.smechina.com.cn",
    url: "/api/Property/GetNumbers",
    method: "get",
    params: data,
    //headers: { token: store.state.token },
  });
}
