<!--
 * @Author: your name
 * @Date: 2020-08-08 17:26:24
 * @LastEditTime: 2020-08-10 19:07:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \app\src\components\table\add.vue
-->
<template>
  <el-drawer
    :visible.sync="drawer"
    title="新增"
    :direction="direction"
    size="400px"
    :withHeader="false"
    class="drawer"
  >
    <div>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item
          label="企业代号"
          prop="companyno"
          v-if="company || department || assets"
        >
          <el-input v-model="ruleForm.companyno"></el-input>
        </el-form-item>
        <el-form-item
          label="部门代号"
          prop="departno"
          v-if="department || assets"
        >
          <el-input v-model="ruleForm.departno"></el-input>
        </el-form-item>
        <el-form-item label="设备代号" prop="equipno" v-if="assets">
          <el-input v-model="ruleForm.equipno"></el-input>
        </el-form-item>
        <el-form-item label="企业名称" prop="companyname" v-if="company">
          <el-input v-model="ruleForm.companyname"></el-input>
        </el-form-item>
        <el-form-item label="部门名称" prop="departname" v-if="department">
          <el-input v-model="ruleForm.departname"></el-input>
        </el-form-item>
        <el-form-item label="设备名称" prop="equipname" v-if="assets">
          <el-input v-model="ruleForm.equipname"></el-input>
        </el-form-item>
        <el-form-item label="资产负责人" prop="assetser" v-if="department">
          <el-input v-model="ruleForm.assetser"></el-input>
        </el-form-item>
        <el-form-item label="进账日期" prop="payintime" v-if="assets">
          <el-date-picker
            v-model="ruleForm.payintime"
            type="date"
            placeholder="选择日期"
            :picker-options="pickerOptions"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="报废标识" v-if="assets"
          ><el-switch
            v-model="ruleForm.scrapmark"
            active-color="#ff4949"
            inactive-color="#1e9fff"
            active-text="已报废"
            inactive-text="工作中"
          >
          </el-switch
        ></el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >新增</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-drawer>
</template>

<script>
//import { company, department, assets } from "@/components/table/data"; //table通用名称和模拟数据
var moderule = {
  required: true,
  message: "不能为空",
  trigger: "blur",
};
export default {
  data() {
    return {
      company: false,
      department: false,
      assets: false,
      //控制不同的页面显示不同form
      direction: "rtl",
      drawer: false,
      ruleForm: {},
      rules: {
        companyno: moderule,
        departno: moderule,
        equipno: moderule,
        companyname: moderule,
        departname: moderule,
        equipname: moderule,
        assetser: moderule, //资产负责人
        payintime: moderule, //进账日期
        scrapmark: moderule, //报废标识
      },
      pickerOptions: {
        //日期快捷选择
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            },
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            },
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            },
          },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.ruleForm);
        } else {
          console.log("新增失败");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="scss" scoped>
.drawer {
  margin: 0;
  ::v-deep .el-drawer:focus {
    outline: 0;
  }
  ::v-deep .el-drawer__body {
    padding: 30px;
    overflow: auto;
    .el-date-editor.el-input {
      width: 100%;
    }
  }
}
</style>
