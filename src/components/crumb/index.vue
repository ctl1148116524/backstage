<!--
 * @Author: your name
 * @Date: 2020-07-23 15:11:41
 * @LastEditTime: 2020-08-10 19:04:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \app\src\components\crumb\index.vue
-->
<template>
  <div class="margin-bottom">
    <el-breadcrumb separator-class="el-icon-arrow-right" v-show="show">
      <el-breadcrumb-item :to="{ path: '/home' }">主页</el-breadcrumb-item>
      <el-breadcrumb-item>{{ parentname }}</el-breadcrumb-item>
      <el-breadcrumb-item>{{ childname }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  data() {
    return {
      parentname: "",
      childname: "",
      show: false,
    };
  },
  created() {
    //console.log(this.$route);

    this.menuchange();
  },
  watch: {
    $route() {
      this.menuchange();
    },
  },
  methods: {
    menuchange() {
     // var home = this.$route.name;
      //if (home != "home") {
        var parentname = this.$route.matched[0].meta.title;
        var childname = this.$route.meta.title;
        this.show = true;
        this.parentname = parentname;
        this.childname = childname;
      //} else {
        //this.show = false;
     // }
    },
  },
};
</script>

<style src="./index.scss" lang="scss" scoped></style>
