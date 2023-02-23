<template>
  <div class="suggestion">
   <p>个性设置</p>
   <div class="line">
    代码块是否显示行数
    <el-switch @change="changeLine"  size="large" v-model="line" />
   </div>
  </div>

</template>

<script lang="ts" setup>
const line = ref(true)
const changeLine = (val:boolean)=>{
  localStorage.setItem("line",val+'')
}
onMounted(()=>{
  const lineStore = localStorage.getItem("line")
  if(lineStore=='true'){
    line.value = true
  }else{
    line.value = false
  }
})
</script>

<style lang="scss" scoped>
.suggestion{
  overflow: hidden;
  user-select: none;
  /* background: red; */
  margin-top: 30px;
  padding: 0 30px;
  box-sizing: border-box;
  .line{
    font-size: 16px;
  }
}
</style>