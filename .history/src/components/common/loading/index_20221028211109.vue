<template>
  <div class="box" :style="{height:`${height}px`}"   >
  <div v-loading="loading"></div>
  </div> 
</template>

<script setup lang="ts">
const loading = ref(true)
type TLoadingOptions = {
  height?:number
}

const props = withDefaults(defineProps<TLoadingOptions>(),{
  height:500
})


</script>

<style lang='scss' scoped> 
.loading{
  height: 500px;
  z-index: 6;
}
.example-showcase .el-loading-mask {
  z-index: 9;
}
</style>