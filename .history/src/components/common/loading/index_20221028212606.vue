<template>
  <div class="box" :style="{height:`${height}px`}"   >
  <div class="loading" v-loading="loading" 
    :element-loading-background="colors"
    element-loading-text="拼命加载中..."
  ></div>
  </div> 
</template>

<script setup lang="ts">
const loading = ref(true)
const colors =ref("#fff")
type TLoadingOptions = {
  height?:number
}
onMounted(()=>{
  const theme = localStorage.getItem("vueuse-color-scheme") as string
  if(theme=="dark"){
    colors.value = "#141414"
  }else{
    colors.value = "#fff"
  }
})

const props = withDefaults(defineProps<TLoadingOptions>(),{
  height:500
})


</script>

<style lang='scss' scoped> 
.box{
  height: 500px;
  z-index: 6;
  background: var(--el-bg-color);
  .loading{
    z-index: 6;
    height: 500px;
    margin-top: 40px;
    background: var(--el-bg-color);
  }
}
.example-showcase .el-loading-mask {
  z-index: 9;
}
</style>