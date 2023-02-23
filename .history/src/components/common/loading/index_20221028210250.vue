<template>
  <div class="loading" :style="{height:`${height}px`}"  v-loading="loading" ></div> 
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
// .loading{
  // height: 500px;
// }
.example-showcase .el-loading-mask {
  z-index: 9;
}
</style>