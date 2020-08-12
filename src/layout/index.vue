<!--
 * @Author: your name
 * @Date: 2020-07-18 15:43:42
 * @LastEditTime: 2020-08-11 22:56:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \app\src\layout\index.vue
-->
<template>
  <el-container style="height:100%">
    <el-aside :width="menuwidth" class="slidebg">
      <my-slidemenu ref="menu" :states="states"></my-slidemenu>
    </el-aside>
    <el-container>
      <el-header class="headbg"><my-head ref="head"></my-head></el-header>
      <el-main>
        <!-- <crumb></crumb> -->
        <transition>
          <!-- 所有路由过渡动画 -->
          <router-view></router-view>
        </transition>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import slidemenu from "@/layout/slidemenu";
import head from "@/layout/head";
//import crumb from "@/components/crumb";

export default {
  provide: function() {
    //将方法导出到子组件
    return {
      change: this.change,
    };
  },
  data() {
    return {
      menuwidth: "auto",
      states: false, //控制 菜单缩放 false开 true 缩
    };
  },
  components: {
    "my-slidemenu": slidemenu,
    "my-head": head,
    //crumb,
  },
  methods: {
    change(val, width) {
      //改变菜单
      this.states = !val;
      //console.log(val);
    },
  },
};
</script>

<style lang="scss" scoped>
.slidebg {
  /**background: #304156;**/
  background: #2bb26e;
}
.headbg {
  background: #fff;
  box-shadow: 0 2px 4px #ddd;
}
</style>
