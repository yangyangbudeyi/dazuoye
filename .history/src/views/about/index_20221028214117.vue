<template>
  
  <div class="about">
    <MarkDown :previewOnly="true" :value="aboutData"></MarkDown>
  </div>

</template>

<script setup lang="ts">
import {getAboutContent} from "@/api/request"
const aboutData = ref("")
onMounted(()=>{
  document.documentElement.scrollTo({
    behavior:"smooth",
    top:0
  })
  getAbout()
})

onActivated(()=>{
  document.documentElement.scrollTo({
    behavior:"smooth",
    top:0
  })
})
const getAbout = async ()=>{
  const {data:res} = await  getAboutContent()
  if(res.code!=200) return ElMessage.error("服务异常！")
  aboutData.value = res.data[0]?.artContent
}
</script>

<style lang="scss" scoped>
.about{
  min-height: 60vh;
  width: 1300px;
  background: var(--el-bg-color);
  margin: 0 auto;
  padding: 15px 30px;
  border-radius: 4px;
}
</style>