<!--
 * @Author: your name
 * @Date: 2020-07-16 21:33:10
 * @LastEditTime: 2020-07-23 14:21:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \app\src\views\home\index.vue
-->
<template>
  <div>
    <button type="button" @click="hq">获取</button>
    <button type="button" @click="luyou">登录状态</button>
    <button type="button" @click="out">退出</button>
  </div>
</template>

<script>
import Layout from "@/layout";
import { app } from "@/api/login.js";

export default {
  creat: function() {},
  methods: {
    hq() {
      app()
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    luyou() {
      var luyou = this.$store.state.onlogin;
      var luyou2 = this.$store.state.menu;
      var luyou3 = this.$store.state.list;
      var luyou4 = this.$store.state.user_name;
      var luyou5 = this.$store.state.token;
      console.log(luyou);
      console.log(luyou2);
      console.log(luyou3);
      console.log(luyou4);
      console.log(luyou5);
    },
    out() {
      window.clearVuexAlong(); //清理 localStorage 和 sessionStorage
      this.$store.commit({
        //vuex退出登录状态
        type: "login",
        amount: [false, null, null],
      });
      this.$store.commit({
        //vuex退出登录 动态菜单清空
        type: "readdmenu",
        amount: [null, null],
      });
    },
  },
};
</script>

<style src="./index.scss" lang="scss" scoped></style>
