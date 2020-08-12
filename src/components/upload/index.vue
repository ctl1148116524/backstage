<!--
 * @Author: your name
 * @Date: 2020-07-23 19:20:48
 * @LastEditTime: 2020-07-30 10:39:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \app\src\components\upload\index.vue
-->
<template>
  <div>
    <el-upload
      class="upload-demo"
      action="http://localhost:81/post/uploadimg"
      :headers="headers"
      list-type="picture-card"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-remove="beforeRemove"
      :limit="1"
      :file-list="form1.fileList"
      :on-success="success"
      :on-error="fail"
    >
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">
        只能上传不超过2m
      </div>
    </el-upload>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form1: {
        fileList: [],
      },
      headers: { token: this.$store.state.token },
    };
  },
  methods: {
    success(response, file, fileList) {
      console.log(response);
     // console.log(file);
     // console.log(fileList);
    },
    fail(err, file, fileList) {
      console.log(err);
      console.log(file);
      console.log(fileList);
    },
    handleRemove(file, fileList) {
      //console.log(file, fileList);
    },
    handlePreview(file) {
     // console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
  },
};
</script>

<style src="./index.scss" lang="scss" scoped></style>
