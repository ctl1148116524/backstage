<!--
 * @Author: your name
 * @Date: 2020-07-19 14:21:35
 * @LastEditTime: 2020-08-11 20:32:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \app\src\layout\head\index.vue
-->
<template>
  <div class="head">
    <div class="name">
      <i
        :class="menustates ? 'el-icon-s-fold' : 'el-icon-s-unfold'"
        @click="onstates(menustates)"
      ></i>
      <h3>后台操作管理系统</h3>
    </div>
    <div class="user">
      <el-dropdown :hide-timeout="500" @command="handleCommand">
        <span class="el-dropdown-link">
          <el-avatar :src="userimg"></el-avatar>
          {{ username }}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="el-icon-s-home" command="home"
            >主 页</el-dropdown-item
          >
          <!-- <el-dropdown-item icon="el-icon-picture" command="img"
            >修改头像divided</el-dropdown-item
          > -->
          <el-dropdown-item  icon="el-icon-switch-button" command="out"
            >退出登录</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { loginout } from "@/utils";
import userimg from "@/assets/user.jpg";
export default {
  inject: ["change"], //导入父组件的方法
  data() {
    return {
      menustates: true,
      //用户
      username: "",
      userimg: userimg,
    };
  },
  created: function() {
    this.username = this.$store.state.user_name;
  },
  methods: {
    onstates(val) {
      //切换菜单  完整/略缩
      if (val) {
        this.menustates = false;
        this.change(false);
      } else {
        this.menustates = true;
        this.change(true);
      }
    },
    // user功能
    handleCommand(command) {
      switch (command) {
        case "home":
          this.$router.push("/home/index");
          break;
        case "img":
          this.$message({ message: "功能暂未开通", duration: 2000 });
          break;
        case "out":
          this.$confirm("是否退出登录?", "提示", {
            confirmButtonText: "退出",
            cancelButtonText: "取消",
            type: "info ",
          })
            .then(() => {
              this.$message({
                type: "success",
                message: "退出成功!",
                duration: 1000,
              });
              loginout(); //退出
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "退出取消",
                duration: 1000,
              });
            });
          break;
      }
      //console.log(command);
    },
  },
};
</script>

<style src="./index.scss" lang="scss" scoped></style>
