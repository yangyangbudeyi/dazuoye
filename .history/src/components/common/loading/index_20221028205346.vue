<template>
  <div class="loading"  v-loading="loading" ></div> 
</template>

<script setup lang="ts">
const loading = ref(true)
</script>

<style lang='scss' scoped> 
.loading{
  height: 500px;
}
.example-showcase .el-loading-mask {
  z-index: 9;
}
</style>