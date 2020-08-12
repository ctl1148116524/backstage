<!--
 * @Author: your name
 * @Date: 2020-07-23 16:22:17
 * @LastEditTime: 2020-07-30 10:38:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \app\src\views\function\img\index.vue
-->
<template>
  <el-row type="flex" :gutter="20">
    <el-col :span="24">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>上传单个图片</span>
        </div>
        <uploadimg></uploadimg>
      </el-card>
    </el-col>
    <el-col :span="24">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>上传多个图片</span>
        </div>
        <uploadimgs></uploadimgs>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import uploadimg from "@/components/upload/index";
import uploadimgs from "@/components/upload/indexs";
export default {
  components: {
    uploadimg,
    uploadimgs,
  },
};
</script>

<style src="./index.scss" lang="scss" scoped></style>
