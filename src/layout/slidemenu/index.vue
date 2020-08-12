<!--
 * @Author: your name
 * @Date: 2020-07-19 14:20:44
 * @LastEditTime: 2020-08-11 22:56:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \app\src\layout\slidemenu\index.vue
-->
<template>
  <div>
    <el-menu
      :default-active="nowmenu"
      class="el-menu-vertical-demo"
      :unique-opened="true"
      :router="true"
      background-color="#2bb26e"
      text-color="#fff"
      active-text-color="#ffd04b"
      :collapse="states"
    >
      <template v-for="menulist of menulists">
        <!-- 带多个子菜单 -->
        <el-submenu
          v-if="menulist.children.length > 1"
          :index="menulist.path"
          :key="menulist.path"
        >
          <template slot="title">
            <i :class="menulist.meta.icon"></i>
            <span slot="title">{{ menulist.meta.title }}</span>
          </template>
          <el-menu-item
            v-for="(child, index) of menulist.children"
            :key="'zi' + index"
            :index="menulist.path + '/' + child.path"
            >{{ child.meta.title }}</el-menu-item
          >
        </el-submenu>
        <!-- 单个菜单 -->
        <el-menu-item
          v-else
          :index="menulist.path + '/' + menulist.children[0].path"
          :key="menulist.path"
        >
          <i :class="menulist.meta.icon"></i>
          <span slot="title">{{ menulist.meta.title }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
import router from "@/router";

export default {
  props: ["states"],
  data() {
    return {
      nowmenu: "/home",
      menulists: [],
    };
  },
  // beforeCreate: function() {
  //   console.log(this.$store.state.list);
  // },
  created: function() {
    var li = this.$store.state.list;
    var end = li[li.length - 1];
    if (end.path == "*") {
      //判断数组是否有404页面
      li.pop();
    }
    this.menulists = li; //从store 获取权限列表
    this.nowmenu = this.$route.path; //刷新后导航栏默认当前菜单
    //console.log(end);
    //console.log(li);
    //console.log(end.path == "*");
  },
  watch: {
    $route() {
      //观察路由变化
      this.nowmenu = this.$route.path; //刷新后导航栏默认当前菜单
      //console.log(this.$route.path);
    },
  },
  methods: {},
};
</script>

<style src="./index.scss" lang="scss" scoped></style>
