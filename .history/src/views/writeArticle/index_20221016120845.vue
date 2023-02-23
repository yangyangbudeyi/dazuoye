<template>
  <div class="writeArticle">
  <ArtInfoForm :data="articleTagsData"></ArtInfoForm>
  </div>

</template>

<script setup lang="ts">
import {getTagsAll} from "@/api/request"
import ArtInfoForm from "./components/artInfoForm/index.vue"
import {ITagsData} from "@/types/article";


const router = useRouter()
const articleTagsData = ref<ITagsData[]>([])
onMounted(()=>{
  getTags()
})
onActivated(()=>{
  const userId  = JSON.parse(localStorage.getItem("userInfo") as string)?.userId
  const token = localStorage.getItem("token")
  if(!userId || !token) {
    ElMessage.warning("请先登录")
    sessionStorage.setItem("navigateLoginPre","/write/article")
    router.replace("/login")
  }
})
//获取所有文章标签
const getTags =async ()=>{
  const {data:res} = await getTagsAll()
  if(res.code!=200) return articleTagsData.value=[]
  articleTagsData.value = res.data
}

</script>

<style lang="scss" scoped>
.writeArticle{
  width: 1400px;
  min-height: 600px;
  box-sizing: border-box;
  user-select: none;
  margin: 0 auto;
  overflow: hidden;
}
</style>