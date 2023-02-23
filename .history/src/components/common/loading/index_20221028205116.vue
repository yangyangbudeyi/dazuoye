<template>
  <div class="loading"></div> 
</template>

<script setup lang="ts">
const loading = ref(true)
</script>

<style lang='less' scoped> 
body {
  margin: 0;
}
.example-showcase .el-loading-mask {
  z-index: 9;
}
</style>