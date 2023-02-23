<template>
  <div class="loading"  v-loading="loading" ></div> 
</template>

<script setup lang="ts">
const loading = ref(true)
</script>

<style lang='less' scoped> 
.loading{
  
}
.example-showcase .el-loading-mask {
  z-index: 9;
}
</style>