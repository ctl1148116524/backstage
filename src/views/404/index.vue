<!--
 * @Author: your name
 * @Date: 2020-07-18 14:58:05
 * @LastEditTime: 2020-07-23 16:11:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \app\src\views\404\index.vue
-->
<template>
  <div class="wscn-http404-container">
    <div class="wscn-http404">
      <div class="pic-404">
        <img
          class="pic-404__parent"
          src="@/assets/404_images/404.png"
          alt="404"
        />
        <img
          class="pic-404__child left"
          src="@/assets/404_images/404_cloud.png"
          alt="404"
        />
        <img
          class="pic-404__child mid"
          src="@/assets/404_images/404_cloud.png"
          alt="404"
        />
        <img
          class="pic-404__child right"
          src="@/assets/404_images/404_cloud.png"
          alt="404"
        />
      </div>
      <div class="bullshit">
        <div class="bullshit__oops">找不到这个网页!</div>
        <!-- <div class="bullshit__info">
          <a style="color:#20a0ff" href="" target="_blank"></a>
        </div> -->
        <div class="bullshit__headline">{{ message }}</div>
        <div class="bullshit__info">
          请检查您输入的URL是否正确，或单击下面的按钮以返回首页。
        </div>
        <router-link to="/home" class="bullshit__return-home"
          >返回首页</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Page404",
  computed: {
    message() {
      return "您可能没有权限访问这个页面,或者这个页面不存在。";
    },
  },
};
</script>

<style src="./index.scss" lang="scss" scoped></style>
