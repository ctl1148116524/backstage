<!--
 * @Author: your name
 * @Date: 2020-08-09 08:02:35
 * @LastEditTime: 2020-08-11 16:41:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \app\src\components\table\qrcode.vue
-->
<template>
  <el-drawer
    :visible.sync="drawer_qr"
    title="二维码"
    :direction="direction"
    size="100%"
    class="drawer"
  >
    <div class="printbutton no-print">
      <el-button type="primary" @click="prints()">打印</el-button>
    </div>
    <div class="qrcode">
      <div id="qr">
        <div
          v-for="(detail, key) of details"
          :key="key"
          style="width:400px;height:300px"
        >
          <div>
            <!-- <p><label for="">部门：</label><br />{{ detail.departno }}</p> -->
            <p><label for="">gs：</label><br />{{ detail.companyno }}</p>
            <p><label for="">编号：</label><br />{{ detail.equipno }}</p>
            <p><label for="">名称：</label><br />{{ detail.equipname }}</p>
            <p><label for="">日期：</label><br />{{ detail.payintime }}</p>
          </div>
          <vueQr
            :logoSrc="detail.logosrc"
            :text="detail.url"
            :size="400"
          ></vueQr>
        </div>
      </div>
    </div>
  </el-drawer>
</template>

<script>
import vueQr from "vue-qr";
import printJS from "print-js";

export default {
  components: {
    vueQr,
  },
  data() {
    return {
      direction: "rtl",
      drawer_qr: false,
      details: "",
    };
  },
  methods: {
    prints() {
      printJS({
        printable: "qr",
        type: "html",
        // 继承原来的所有样式
        targetStyles: ["*"],
        honorMarginPadding: false, //消除边距
      });
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .el-drawer__header {
  margin-bottom: 0;
}
.printbutton {
  position: absolute;
  z-index: 999;
  top: 0;
  width: 30%;
  left: 30%;
  padding: 10px;
  text-align: center;
}
.qrcode {
  /**width: 121vh;**/
  height: 85vh;
  width: 100vw;
  overflow: auto;
  margin: 5vh auto;
  box-shadow: 0 0 8px #ddd;
}
#qr {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  width: 100%;

  > div {
    width: 50%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding: 20px;
    box-sizing: border-box;
    img {
      width: 58%;
    }
    > div:first-child {
      padding: 5px 10px;
      font-size: 0.8rem;
      color: #6a6a6a;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      > p {
        line-height: 1.2em;
        padding: 10px;
        > label {
          font-weight: bold;
          color: #207ad7;
        }
      }
    }
  }
}
</style>
