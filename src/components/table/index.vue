<!--
 * @Author: your name
 * @Date: 2020-08-08 13:17:37
 * @LastEditTime: 2020-08-12 13:51:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \app\src\components\table\index.vue
-->
<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{ tablename }}</span>
        <el-button
          style="float: right; padding: 3px 0"
          type="text"
          icon="el-icon-plus"
          @click="add_list"
          >新增</el-button
        >
        <el-button
          v-if="qrcoed"
          style="float: right; padding: 3px 0;margin-right:10px"
          type="text"
          icon="el-icon-files"
          @click="qr_batch(choose)"
          >{{ qr_batch_name }}</el-button
        >
      </div>
      <div>
        <el-table
          :data="tableData"
          stripe
          style="width: 100%"
          :row-key="getRowKeys"
          @selection-change="handleSelectionChange"
          ref="multipleTable"
        >
          <el-table-column
            v-if="qrcoed && choose"
            type="selection"
            :reserve-selection="true"
            width="55"
          >
          </el-table-column>
          <el-table-column
            v-for="(list, key) of lists"
            :key="key"
            align="center"
            :prop="list.tbody"
            :label="list.thead"
          >
          </el-table-column>
          <el-table-column fixed="right" align="center" label="操作">
            <template slot-scope="scope">
              <div class="operating">
                <el-tooltip
                  class="item"
                  content="删除"
                  placement="top"
                  :open-delay="300"
                >
                  <el-button
                    @click.native.prevent="
                      delete_list(tableData, scope.row, scope.$index)
                    "
                    type="text"
                    size="small"
                    icon="el-icon-delete"
                    class="red"
                  >
                  </el-button>
                </el-tooltip>
                <el-tooltip
                  v-if="qrcoed"
                  class="item"
                  content="生成二维码"
                  placement="top"
                  :open-delay="300"
                >
                  <el-button
                    @click.native.prevent="add_listqr(scope.row)"
                    type="text"
                    size="small"
                    icon="iconfont icon-ico"
                  >
                  </el-button>
                </el-tooltip>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
          background
          layout="prev, pager, next"
          :total="total_pages"
          :page-size="page_size"
          :hide-on-single-page="true"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
        <!-- 功能按钮 -->
        <div class="option">
          <el-button
            v-if="qrcoed && choose"
            style="margin-right:10px"
            type="primary"
            icon="el-icon-check"
            @click="qr_batch_enter"
            >生成</el-button
          >
        </div>
      </div>
    </el-card>
    <!-- 新增弹出 -->
    <add ref="add"></add>
    <qrcode ref="qrcode"></qrcode>
  </div>
</template>

<script>
import add from "./add";
import qrcode from "./qrcode";
import { get_company } from "@/api";

import {
  company,
  department,
  assets,
  companylist,
  departmentlist,
  assetslist,
} from "@/components/table/data"; //table通用名称和模拟数据

export default {
  components: {
    add,
    qrcode,
  },
  data() {
    return {
      tablename: "",
      lists: "",
      tableData: "",
      //资产页生成二维码按钮
      qrcoed: false,
      //table多选
      qr_batch_name: "批量生成二维码",
      choose: false,
      multipleSelection: [], //记录批量选中的列表
      //分页
      total_pages: "", //总 数据数
      page_size: 10, //每页 数据数
    };
  },
  created: function() {
    switch (this.$route.name) {
      case "company":
        this.tablename = company.tablename;
        this.lists = company.head;
        this.get_tabledata(companylist, 1, this.page_size);
        this.total_pages = companylist.length;
        this.$nextTick(() => {
          this.$refs.add.company = true;
          this.$refs.add.ruleForm = {
            companyno: "",
            companyname: "",
          };
        });
        break;
      case "department":
        this.tablename = department.tablename;
        this.lists = department.head;
        this.get_tabledata(departmentlist, 1, this.page_size);
        this.total_pages = departmentlist.length;
        this.$nextTick(() => {
          this.$refs.add.department = true;
          this.$refs.add.ruleForm = {
            companyno: "",
            departno: "",
            departname: "",
            assetser: "", //资产负责人
          };
        });
        break;
      case "assets":
        this.tablename = assets.tablename;
        this.lists = assets.head;
        this.get_tabledata(assetslist, 1, this.page_size);
        this.total_pages = assetslist.length;
        this.qrcoed = true;
        this.$nextTick(() => {
          this.$refs.add.assets = true;
          this.$refs.add.ruleForm = {
            companyno: "",
            departno: "",
            equipno: "",
            equipname: "",
            payintime: "", //进账日期
            scrapmark: false, //报废标识
          };
        });
        break;
    }
  },
  methods: {
    get_tabledata(val, index, length) {
      //根据分页获取数据   val总数据 index分页第几页  length每页的数据数
      var start = this.page_size * (index - 1); //当前页第一个
      var end = this.page_size * index; //当前页最后一个
      var newlist = val.slice(start, end);
      //console.log(start, end);
      this.tableData = newlist;
    },
    delete_list(tableData, row, index) {
      //删除
      this.$confirm("是否删除?", "确认", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //向后台请求从删除

          //成功后
          tableData.splice(index, 1); //清除列表的数据
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          //取消
        });
      //   console.log(row);
      //   console.log(index);
    },
    add_listqr(row) {
      //生成二维码
      //console.log(row);
      this.$refs.qrcode.drawer_qr = true;
      let arr = [];
      let length;
      let imgurl;
      let qrurl;
      if (!(row instanceof Array)) {
        arr.push(row);
      } else {
        arr = row;
      }
      length = arr.length;
      imgurl = "https://picsum.photos/id/116/200/200";
      qrurl = "https://www.xiaozhuozi.top:44301/qrpage/index.html?id=";
      for (let i = 0; i < length; i++) {
        arr[i].url = qrurl + arr[i].companyno;
        arr[i].logosrc = imgurl;
      }
      this.$refs.qrcode.details = arr;
      //console.log(arr);
    },
    add_list() {
      //新增
      //this.getdata();
      this.$refs.add.drawer = true;
    },
    qr_batch(val) {
      //批量生成二维码
      if (!val) {
        this.choose = true;
        this.qr_batch_name = "取消批量生成";
      } else {
        this.$refs.multipleTable.clearSelection(); //取消是清除table选中的列表
        this.multipleSelection = []; //清除记录的list
        this.choose = false;
        this.qr_batch_name = "批量生成二维码";
      }
    },
    handleSelectionChange(val) {
      //table 多选选择
      this.multipleSelection = val;
      //console.log(val);
    },
    getRowKeys(row) {
      //切换分页,保持选中
      return row.id;
    },
    qr_batch_enter() {
      // 批量确认
      var list = this.multipleSelection;
      this.add_listqr(list);
      //console.log(list);
    },
    handleCurrentChange(val) {
      //点击分页
      switch (this.$route.name) {
        case "company":
          this.get_tabledata(companylist, val, this.page_size);
          break;
        case "department":
          this.get_tabledata(departmentlist, val, this.page_size);
          break;
        case "assets":
          this.get_tabledata(assetslist, val, this.page_size);
          break;
      }
      //console.log(val);
    },
    getdata() {
      //测试用
      var params = { Type: 1 };
      get_company(params)
        .then((val) => {
          console.log(val);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style src="./index.scss" lang="scss" scoped></style>
