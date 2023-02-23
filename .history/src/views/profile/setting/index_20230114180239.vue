<template>
  <div class="suggestion">
   <p>个性设置</p>
   <div class="line">
    代码块显示行数
    <el-switch @change="changeLine"  inline-prompt
    :active-icon="Check"
    :inactive-icon="Close" size="large" v-model="line" />
   </div>
  </div>

</template>

<script lang="ts" setup>
import { Check, Close } from '@element-plus/icons-vue'
const line = ref(true)
const changeLine = (val:boolean)=>{
  localStorage.setItem("line",val+'')
}
onMounted(()=>{
  const lineStore = localStorage.getItem("line")
  if(lineStore){
    if(lineStore=='true'){
      line.value = true
    }else{
      line.value = false
    }
  }else{
    line.value = true
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
  p{
    font-size: 30px;
  }
  .line{
    font-size: 16px;
  }
}
</style>