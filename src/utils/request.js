/*
 * @Author: your name
 * @Date: 2020-07-17 09:10:45
 * @LastEditTime: 2020-08-07 16:01:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \app\src\utils\request.js
 */

import axios from "axios";
import store from "@/store/index";
import router from "@/router/index";
import { MessageBox, Message } from "element-ui";

const service = axios.create({
  baseURL: "https://www.xiaozhuozi.top:44303",
  timeout: 5000,
  headers: { token: "" },
});
service.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded;charset=UTF-8";

service.interceptors.request.use(
  //拦截器
  (config) => {
    // do something before request is sent

    //if (store.getters.token) {
    // let each request carry token
    // ['X-Token'] is a custom headers key
    // please modify it according to the actual situation
    //if (localStorage.getItem("token")) {
    //config.headers["X-Token"] = localStorage.getItem("token");
    //}
    //}
    return config;
  },
  (error) => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

//响应拦截器
axios.interceptors.response.use(
  (response) => {
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
    // 否则的话抛出错误
    if (response.status === 200) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  (error) => {
    if (error.response.status) {
      switch (error.response.status) {
        // 401: 未登录
        // 未登录则跳转登录页面，并携带当前页面的路径
        // 在登录成功后返回当前页面，这一步需要在登录页操作。
        case 401:
          router.replace({
            path: "/login",
            query: {
              redirect: router.currentRoute.fullPath,
            },
          });
          break;

        // 404请求不存在
        case 404:
          Toast({
            message: "网络请求不存在",
            duration: 1500,
            forbidClick: true,
          });
          break;
        // 其他错误，直接抛出错误提示
        default:
          Toast({
            message: error.response.data.message,
            duration: 1500,
            forbidClick: true,
          });
      }
      return Promise.reject(error.response);
    }
  }
);

export default service;
