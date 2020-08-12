<!--
 * @Author: your name
 * @Date: 2020-07-16 21:33:35
 * @LastEditTime: 2020-08-07 16:50:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \app\src\views\login\index.vue
-->
<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="off"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">登录界面</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="账号名称"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="off"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="密码"
          name="password"
          tabindex="2"
          auto-complete="off"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon
            :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
          />
        </span>
      </el-form-item>
      <el-form-item prop="identify" class="identify" v-if="identifyshow">
        <!-- 验证码 -->
        <span class="svg-container">
          <svg-icon icon-class="verification" />
        </span>
        <el-input
          ref="identify"
          v-model="loginForm.identify"
          placeholder="验证码"
          name="identify"
          type="text"
          tabindex="3"
          auto-complete="off"
          @keyup.enter.native="handleLogin"
        />
        <div @click="changeCode" class="ident">
          <identify :identifyCode="identifyCode"></identify>
        </div>
      </el-form-item>
      <el-button
        :loading="loading"
        type="primary"
        style="width:100%;margin-bottom:30px;"
        @click.native.prevent="handleLogin"
        >登录</el-button
      >
    </el-form>
  </div>
</template>

<script>
import { login } from "@/api/login";
import { injectionmenu } from "@/router/getmenu";
import { resetRouter } from "@/router";
import identify from "@/components/identify";
export default {
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入密码"));
      } else if (value.length < 6) {
        callback(new Error("密码必须大于6位"));
      } else {
        callback();
      }
    };
    const validateIdentify = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入验证码"));
      } else if (value.length != 6) {
        callback(new Error("请输入6位验证码"));
      } else if (value.toLowerCase() != this.identifyCode.toLowerCase()) {
        callback(new Error("验证码错误"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: "超级账号",
        password: "123456",
        identify: "", //输入的验证码
      },
      loginRules: {
        //输入验证
        username: [
          { required: true, trigger: "blur", validator: validateUsername },
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword },
        ],
        identify: [
          { required: true, trigger: "blur", validator: validateIdentify },
        ],
      },
      loading: false,
      passwordType: "password",
      identifyCode: "", //验证码初始值
      identifyCodes: "1234567890ABCDEFGHJKLMNPQRSTUVWXYZ", //验证码取值范围 字母缺 I O
      identifyshow: false,
    };
  },
  components: {
    identify,
  },
  mounted() {
    //刷新页面生成新的验证码
    this.changeCode();
    //this.loginForm.identify = this.identifyCode;
  },
  methods: {
    showPwd() {
      //切换密码框显示/加密
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    nofast(time) {
      //防止快速点击
      setTimeout(() => {
        this.loading = false;
      }, time);
    },
    handleLogin() {
      //登录
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          //临时测试 !!!!!!
          // this.$store.commit({
          //   //vuex添加登陆成功状态
          //   type: "login",
          //   amount: [true, "user_name", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoi5byg5Li95ZCbIiwiaWF0IjoxNTk1NTA1MTQzLCJleHAiOjE1OTU1MzM5NDN9.GjnE4T6fI1busFy8_unQ8Ih_GMuiepH5Tw8ntOfYfFI"],
          // });
          // resetRouter(); //动态路由重复添加问题 在登录前和登出时使用
          // injectionmenu("all", this.$router); //登录添加动态路由
          // this.$router.push("/home/index");
          //end临时测试 !!!!!!

          this.loading = true;
          login({
            //登录axios
            name: this.loginForm.username,
            password: this.loginForm.password,
          })
            .then((res) => {
              let no = res.data.status; //返回的状态码
              if (no == "200") {
                let token = res.data.token;
                let user_name = res.data.user_name;
                //let authority = res.data.authority; //权限
                let authority = 'super'; //不需要权限 全部显示
                //localStorage.setItem("token", token); //存储 token和name
                //localStorage.setItem("user_name", user_name);
                this.$store.commit({
                  //vuex添加登陆成功状态
                  type: "login",
                  amount: [true, user_name, token],
                });
                this.$message.success({ message: "登陆成功!", duration: 1000 });
                resetRouter(); //动态路由重复添加问题 在登录前和登出时使用
                injectionmenu(authority); //登录添加动态路由
                //console.log(addmenu);
                this.$router.replace({
                  //跳转到主页
                  path: "/home",
                  //query: { user: "成天磊" },
                });
                //console.log(token);
              } else if (no == "400") {
                this.$message.error({
                  message: "账号或者密码错误!",
                  duration: 2000,
                });
                this.identifyshow = true;
              }
              this.nofast(1000); //防止连续点击
            })
            .catch((err) => {
              this.nofast(1000); //防止连续点击
              this.$message.error({ message: "登陆失败!", duration: 2000 });
              console.log(err);
              this.identifyshow = true;
            });
        } else {
          console.log("提交失败");
          return false;
        }
      });
    },
    //验证码
    changeCode() {
      //点击刷新验证码
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 6);
    },
    randomNum(min, max) {
      //生成一个随机数 min~max 包括 min和max
      max = max + 1;
      return Math.floor(Math.random() * (max - min) + min);
    },
    makeCode(data, len) {
      //随生成验证码字符串
      for (let i = 0; i < len; i++) {
        this.identifyCode += data[this.randomNum(0, data.length - 1)];
      }
    },
  },
};
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
  .identify {
    .el-input input {
      width: 60%;
    }
    .ident {
      position: absolute;
      right: 0;
      top: 0;
      height: 100%;
      overflow: hidden;
      border-radius: 5px;
      cursor: pointer;
    }
  }
  .svg-container .svg-icon {
    width: 1.3em;
    height: 1.3em;
  }
}
</style>

<style src="./index.scss" lang="scss" scoped></style>
