<!--
 * @Author: your name
 * @Date: 2020-08-07 16:48:48
 * @LastEditTime: 2020-08-08 10:45:41
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \app\src\views\department\index.vue
-->
<template>
  <div><my-table></my-table></div>
</template>

<script>
import _table from "@/components/table";
export default {
  data() {
    return {};
  },
  components: {
    "my-table": _table,
  },
};
</script>

<style src="./index.scss" lang="scss" scoped></style>
