<template>
  <div class="box" :style="{height:`${height}px`}"   >
  <div class="loading" v-show="!dark" v-loading="loading" 
    element-loading-background="#ffffff"
    element-loading-text="拼命加载中..."
    :style="{marginTop:`${top}px`}"
  ></div>
  <div class="loading" v-show="dark" v-loading="loading" 
    element-loading-background="#141414"
    element-loading-text="拼命加载中..."
    :style="{marginTop:`${top}px`}"
  ></div>
  </div> 
</template>

<script setup lang="ts">
const loading = ref(true)
const dark =ref(false)

onMounted(()=>{
  getTheme()
})

const getTheme = ()=>{
  const theme = localStorage.getItem("vueuse-color-scheme") as string
  console.log("激活",theme)
  if(theme=="dark"){
    dark.value = true
  }else{
    dark.value = false
  }
}

type TLoadingOptions = {
  height?:number,
  top?:number,
  changeTheme?:()=>void
}
const props = withDefaults(defineProps<TLoadingOptions>(),{
  height:500,
  top:40,
})




</script>

<style lang='scss' scoped> 
.box{
  height: 500px;
  z-index: 6;
  background: var(--el-bg-color);
  overflow: hidden;
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