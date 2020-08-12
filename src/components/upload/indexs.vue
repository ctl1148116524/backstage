<!--
 * @Author: your name
 * @Date: 2020-07-23 19:20:48
 * @LastEditTime: 2020-07-30 10:51:58
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
      :before-remove="beforeRemove"
      :before-upload="beforeUpload"
      :limit="2"
      :file-list="form1.fileList"
      :on-success="success"
      :on-error="fail"
      :on-exceed="limit"
    >
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">
        只能上传jpg/png/gif文件，且不超过2m
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
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    beforeUpload(file) {
      const type = file.type === "image/jpeg" || "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!type) {
        this.$message.error("上传头像图片不是 jpg/png 格式!");
        console.log(1)
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return type && isLt2M;
    },
    limit(files, fileList) {
      let len = fileList.length;
      console.log(len);
    },
  },
};
</script>

<style src="./index.scss" lang="scss" scoped></style>
