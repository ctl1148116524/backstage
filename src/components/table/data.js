/*
 * @Author: your name
 * @Date: 2020-08-08 14:33:10
 * @LastEditTime: 2020-08-11 20:01:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \app\src\views\company\data.js
 */
//对应 企业/部门/资产 表头名 和 数据名
var company = {
  tablename: "企业列表",
  head: [
    { thead: "企业代号", tbody: "companyno" },
    { thead: "企业名称", tbody: "companyname" },
  ],
};
var department = {
  tablename: "部门列表",
  head: [
    { thead: "企业代号", tbody: "companyno" },
    { thead: "部门代号", tbody: "departno" },
    { thead: "部门名称", tbody: "departname" },
    { thead: "资产负责人", tbody: "assetser" },
  ],
};
var assets = {
  tablename: "资产列表",
  head: [
    { thead: "设备代号", tbody: "equipno" },
    { thead: "企业代号", tbody: "companyno" },
    { thead: "部门代号", tbody: "departno" },
    { thead: "设备名称", tbody: "equipname" },
    { thead: "进账日期", tbody: "payintime" },
    { thead: "报废标识", tbody: "scrapmark" },
  ],
};
//模拟数据
var length = 20;
function each1() {
  let arr = [];
  for (let i = 0; i < length; i++) {
    let data = {
      id: i,
      companyno: i,
      companyname: "上海有色金属交易中心有限公司",
    };
    arr.push(data);
  }
  return arr;
}
function each2() {
  let arr = [];
  for (let i = 0; i < length; i++) {
    let data = {
      id: i,
      companyno: i,
      departno: "517",
      departname: "技术部",
      assetser: "严经理",
    };
    arr.push(data);
  }
  return arr;
}
function each3() {
  let arr = [];
  for (let i = 0; i < length; i++) {
    let data = {
      id: i,
      equipno: "11234567",
      companyno: i,
      departno: "517",
      equipname: "戴尔笔记本电脑",
      payintime: "2020-08-08",
      scrapmark: "否",
    };
    arr.push(data);
  }
  return arr;
}

var companylist = each1();
var departmentlist = each2();
var assetslist = each3();

export { company, department, assets, companylist, departmentlist, assetslist };
